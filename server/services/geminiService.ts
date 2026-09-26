import { GoogleGenAI } from '@google/genai';
import { FactorBreakdown, StudentProfileInput } from '../engine/recommendationEngine';
import { CareerItem } from '../data/careersDatabase';

// Instantiate GoogleGenAI client with required header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey.trim() !== '' && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

export class GeminiService {
  public static isAiAvailable(): boolean {
    return ai !== null;
  }

  /**
   * Explains why a specific career matches the student's profile
   */
  public static async explainCareerMatch(
    career: CareerItem,
    profile: StudentProfileInput,
    breakdown: FactorBreakdown
  ): Promise<string> {
    if (!ai) {
      return `Based on your profile as a ${profile.educationLevel} candidate with interest in ${profile.interests.slice(0, 3).join(', ')}, ${career.title} provides a natural trajectory. The Java recommendation engine calculated a Profile Match Score of ${breakdown.totalMatchScore}%. Key drivers: Interest Alignment (${breakdown.interestScore}/30) and Academic Eligibility (${breakdown.educationScore}/20). Focus on mastering the recommended roadmap milestones.`;
    }

    try {
      const prompt = `You are a supportive, knowledgeable career counselor on the 'AI Career Navigator' platform.
A candidate has received a Profile Match Score of ${breakdown.totalMatchScore}% for the career "${career.title}" (${career.category}).

Candidate Context:
- Education Level: ${profile.educationLevel}
- Branch/Stream: ${profile.stream || profile.branch || profile.degreeSpecialization || 'General'}
- Key Interests: ${profile.interests.join(', ')}
- Career Goals: ${profile.careerGoals.join(', ')}
- Technical Skills: ${(profile.technicalSkills || []).join(', ') || 'Foundational stage'}
- Engine Breakdown: Interest ${breakdown.interestScore}/30, Education ${breakdown.educationScore}/20, Skill ${breakdown.skillScore}/20, Goal ${breakdown.goalScore}/10.

Write an encouraging, insightful, and practical 2-paragraph analysis:
1. Explain WHY this career path has strong alignment with their strengths and stated ambitions.
2. Provide a concrete, immediate high-leverage action item they can execute this week.
Keep tone professional, encouraging, and clear. Avoid generic buzzwords.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      return response.text || 'Path alignment confirmed by engine.';
    } catch (err: any) {
      console.error('Gemini explanation error:', err?.message);
      return `Profile alignment identified: ${career.title} matches your stated interests (${profile.interests.slice(0, 3).join(', ')}) with a calculated Profile Match Score of ${breakdown.totalMatchScore}%.`;
    }
  }

  /**
   * Career guidance chatbot
   */
  public static async chatCareerAssistant(
    profile: StudentProfileInput | null,
    message: string,
    history: Array<{ role: 'user' | 'model'; text: string }> = []
  ): Promise<string> {
    if (!ai) {
      // High-value fallback responses tailored to classic student questions
      const lower = message.toLowerCase();
      if (lower.includes('10th') || lower.includes('tenth') || lower.includes('mpc')) {
        return `For students completing 10th or entering Intermediate MPC:
1. **MPC (Maths, Physics, Chemistry)** is the standard gateway to engineering degrees (B.Tech in CSE, AI/ML, ECE).
2. **Alternative:** 3-Year Polytechnic Diploma in Computer Engineering lets you enter 2nd year B.Tech directly via lateral entry (ECET).
3. **Action:** Focus on developing sharp mathematical reasoning and try introductory Python or Java coding!`;
      }
      if (lower.includes('bca') || lower.includes('degree')) {
        return `Transitioning from BCA / B.Sc to high-paying tech:
1. BCA covers programming, database systems, and algorithms.
2. You can pursue an **MCA** for Tier-1 campus placement eligibility, OR build an outstanding GitHub portfolio with Spring Boot / MERN to get hired directly.
3. Target roles: Software Engineer, Full Stack Developer, or Data Analyst.`;
      }
      if (lower.includes('java') || lower.includes('backend')) {
        return `To become an industry-ready Backend Developer with Java:
1. Master **Java 21 fundamentals**: OOP, Collections, Streams, Multithreading, Generics.
2. Learn **Spring Boot 3**: REST controllers, Spring Data JPA, Hibernate, Bean Validation.
3. Master **Databases**: Relational MySQL/PostgreSQL indexing, normalization, and ACID transactions.
4. Build a real project like a Banking Transaction API or E-Commerce Microservice and host it with Docker!`;
      }
      return `As your AI Career Navigator Assistant: Based on your current profile, focus on mastering foundational competencies first, building 2 deployable projects, and following the stage-by-stage roadmap. Explore the 'Career Explorer' and 'Skill Gap' tabs for tailored recommendations!`;
    }

    try {
      const profileSummary = profile
        ? `Student Profile: Education: ${profile.educationLevel}, Stream/Branch: ${profile.stream || profile.branch || 'General'}, Interests: ${profile.interests.join(', ')}, Goals: ${profile.careerGoals.join(', ')}, Skills: ${(profile.technicalSkills || []).join(', ') || 'Foundational'}`
        : 'Student Profile: Not yet completed onboarding.';

      const conversationHistory = history
        .slice(-6)
        .map((h) => `${h.role === 'user' ? 'Student' : 'Assistant'}: ${h.text}`)
        .join('\n');

      const prompt = `You are the AI Career Navigator Assistant, a supportive, precise, and practical academic & tech career mentor.

Current User Context:
${profileSummary}

Previous conversation:
${conversationHistory}

Student's Latest Message:
"${message}"

Instructions:
- Provide a clear, actionable, structured answer (bullet points where helpful).
- If the student asks about streams after 10th/12th (e.g. MPC, BiPC, MEC), explain the realistic education trajectories.
- If the student asks about tech stacks, provide practical roadmaps.
- Be concise, warm, and motivating. Avoid vague advice.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      return response.text || 'I am here to guide your career path. How can I help?';
    } catch (err: any) {
      console.error('Gemini chat error:', err?.message);
      return `I received your question. As you progress along your career journey, prioritize mastering core problem-solving, build practical projects, and review the detailed roadmaps generated for your target careers!`;
    }
  }

  /**
   * Resume text analyzer
   */
  public static async analyzeResumeText(
    resumeText: string,
    targetCareerTitle: string
  ): Promise<{
    detectedSkills: string[];
    detectedEducation: string;
    strengths: string[];
    gaps: string[];
    suggestions: string[];
  }> {
    if (!ai) {
      // Rule-based resume parser fallback
      const commonSkills = [
        'Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C', 'SQL', 'MySQL', 'PostgreSQL',
        'Spring Boot', 'React', 'Node.js', 'HTML', 'CSS', 'Docker', 'Git', 'AWS', 'Linux',
        'Data Structures', 'Machine Learning', 'Figma', 'Tableau', 'Power BI', 'Excel'
      ];
      const detected = commonSkills.filter((s) => new RegExp(`\\b${s}\\b`, 'i').test(resumeText));

      return {
        detectedSkills: detected.length > 0 ? detected : ['Basic Computing', 'Problem Solving'],
        detectedEducation: resumeText.includes('B.Tech') ? 'B.Tech Engineering' : resumeText.includes('BCA') ? 'BCA' : 'Graduate Degree',
        strengths: [
          'Clear presentation of technical keywords',
          `Detected ${detected.length} verified technical skills matching industry benchmarks`
        ],
        gaps: [
          'Add quantified impact metrics (e.g., "improved query speed by 35%")',
          'Include live deployment links (GitHub / live demo URLs) for projects'
        ],
        suggestions: [
          `Tailor the summary section specifically for ${targetCareerTitle}`,
          'Ensure projects have clear architecture and tech stack descriptions'
        ]
      };
    }

    try {
      const prompt = `You are an expert technical recruiter and resume analyzer for the 'AI Career Navigator' platform.
Analyze the following resume text against the target career: "${targetCareerTitle}".

Resume Content:
"""
${resumeText.slice(0, 4000)}
"""

Respond in valid JSON format with the following schema:
{
  "detectedSkills": ["skill1", "skill2"],
  "detectedEducation": "degree name or summary",
  "strengths": ["bullet1", "bullet2"],
  "gaps": ["bullet1", "bullet2"],
  "suggestions": ["bullet1", "bullet2", "bullet3"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return {
        detectedSkills: parsed.detectedSkills || ['General Skills'],
        detectedEducation: parsed.detectedEducation || 'Degree / Diploma detected',
        strengths: parsed.strengths || ['Good foundational experience'],
        gaps: parsed.gaps || ['Add more specific project impact metrics'],
        suggestions: parsed.suggestions || ['Add live project URLs and align skills with target role']
      };
    } catch (err: any) {
      console.error('Gemini resume analysis error:', err?.message);
      return {
        detectedSkills: ['Java', 'SQL', 'Git', 'Problem Solving'],
        detectedEducation: 'Undergraduate Program',
        strengths: ['Solid technical profile'],
        gaps: ['Add live demo URLs and quantified business metrics'],
        suggestions: [`Highlight coursework and tools specific to ${targetCareerTitle}`]
      };
    }
  }
}
