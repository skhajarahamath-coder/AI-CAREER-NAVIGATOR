import { CAREERS_DATABASE, CareerItem } from '../data/careersDatabase';

export interface StudentProfileInput {
  educationLevel: '10th' | 'Intermediate / 12th' | 'Diploma' | 'B.Tech / B.E' | 'Degree' | 'Postgraduate';
  stream?: string; // For 12th: MPC, BiPC, MEC, CEC, HEC, Other
  branch?: string; // For B.Tech / Diploma: CSE, ECE, MECH, CIVIL, IT, AI/DS
  degreeSpecialization?: string; // For Degree: BCA, B.Sc, B.Com, BA, etc.
  currentYear?: string; // 1st, 2nd, 3rd, 4th, Completed
  cgpaPercentage?: number;
  backlogs?: number;
  academicPerformance?: 'Excellent' | 'Good' | 'Average';
  mathPerformance?: 'Strong' | 'Average' | 'Needs Improvement';
  sciencePerformance?: 'Strong' | 'Average' | 'Needs Improvement';
  englishPerformance?: 'Strong' | 'Average' | 'Needs Improvement';
  favoriteSubjects?: string[];
  interests: string[];
  personalityTraits?: string[];
  careerGoals: string[];
  technicalSkills?: string[];
  projectCount?: number;
  certificationCount?: number;
  workEnvironmentPref?: string;
  higherEdPref?: string;
  studyAbroadInterest?: boolean;
  govtPrivatePref?: string;
}

export interface FactorBreakdown {
  interestScore: number;      // max 30
  educationScore: number;     // max 20
  skillScore: number;         // max 20
  goalScore: number;          // max 10
  academicScore: number;      // max 10
  experienceScore: number;    // max 10
  totalMatchScore: number;    // 0 to 99
  highlights: string[];
  missingSkills: string[];
}

export interface ScoredCareerResult {
  career: CareerItem;
  breakdown: FactorBreakdown;
}

export interface RoadmapStageItem {
  stageNumber: number;
  stageTitle: string;
  duration: string;
  focus: string;
  topics: string[];
  actionItems: string[];
}

export interface SkillGapResult {
  isSchoolStudent: boolean;
  readinessPercentage: number;
  currentSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  skillsToDevelopLater: string[];
  learningSequence: string[];
}

/**
 * Pure Java-equivalent Weighted Career Recommendation Engine
 */
export class CareerRecommendationEngine {
  public static rankCareers(profile: StudentProfileInput, careers: CareerItem[] = CAREERS_DATABASE): ScoredCareerResult[] {
    const scored = careers.map((career) => this.evaluateCareer(profile, career));
    return scored.sort((a, b) => b.breakdown.totalMatchScore - a.breakdown.totalMatchScore);
  }

  public static evaluateCareer(profile: StudentProfileInput, career: CareerItem): ScoredCareerResult {
    const highlights: string[] = [];
    const missingSkills: string[] = [];

    // 1. Interest Match (Weight: 30%)
    const interestScore = this.calcInterestScore(profile, career, highlights);

    // 2. Education Compatibility (Weight: 20%)
    const educationScore = this.calcEducationScore(profile, career, highlights);

    // 3. Skill Match (Weight: 20%)
    const skillScore = this.calcSkillScore(profile, career, highlights, missingSkills);

    // 4. Goal Match (Weight: 10%)
    const goalScore = this.calcGoalScore(profile, career, highlights);

    // 5. Academic Subjects Match (Weight: 10%)
    const academicScore = this.calcAcademicScore(profile, career, highlights);

    // 6. Projects & Certifications (Weight: 10%)
    const experienceScore = this.calcExperienceScore(profile, career, highlights);

    const rawTotal = interestScore + educationScore + skillScore + goalScore + academicScore + experienceScore;
    const totalMatchScore = Math.min(98, Math.max(15, Math.round(rawTotal)));

    const breakdown: FactorBreakdown = {
      interestScore: Math.round(interestScore * 10) / 10,
      educationScore: Math.round(educationScore * 10) / 10,
      skillScore: Math.round(skillScore * 10) / 10,
      goalScore: Math.round(goalScore * 10) / 10,
      academicScore: Math.round(academicScore * 10) / 10,
      experienceScore: Math.round(experienceScore * 10) / 10,
      totalMatchScore,
      highlights,
      missingSkills
    };

    return { career, breakdown };
  }

  private static calcInterestScore(profile: StudentProfileInput, career: CareerItem, highlights: string[]): number {
    if (!profile.interests || profile.interests.length === 0) return 15;

    const careerInterests = career.relatedInterests.map((i) => i.toLowerCase());
    const matchedCount = profile.interests.filter((userInterest) =>
      careerInterests.some((ci) => ci.includes(userInterest.toLowerCase()) || userInterest.toLowerCase().includes(ci))
    ).length;

    const ratio = Math.min(1.0, matchedCount / Math.max(1, Math.min(3, careerInterests.length)));
    const score = ratio * 30.0;

    if (matchedCount > 0) {
      highlights.push(`Aligned with ${matchedCount} of your chosen passions (${career.relatedInterests.slice(0, 3).join(', ')})`);
    }
    return score;
  }

  private static calcEducationScore(profile: StudentProfileInput, career: CareerItem, highlights: string[]): number {
    const edu = profile.educationLevel;
    if (!edu) return 12;

    if (edu === '10th') {
      if (career.category === 'Software & Cloud' || career.category === 'AI & Data') {
        highlights.push('Directly achievable via Intermediate MPC stream or 3-year Polytechnic CSE Diploma');
        return 19.0;
      }
      if (career.category === 'Design & Product' || career.category === 'Business & Analytics') {
        highlights.push('Achievable via Commerce (MEC/CEC) or Arts streams with foundational computer literacy');
        return 18.0;
      }
      if (career.category === 'Civil & Public Services') {
        highlights.push('Broad future eligibility across any higher secondary stream');
        return 18.5;
      }
      return 15.0;
    }

    if (edu === 'Intermediate / 12th') {
      const stream = (profile.stream || '').toUpperCase();
      if (stream.includes('MPC')) {
        if (career.category === 'Software & Cloud' || career.category === 'AI & Data' || career.category === 'Core Engineering') {
          highlights.push('MPC stream provides ideal foundational mathematics & physics for B.Tech & BCA pathways');
          return 20.0;
        }
      } else if (stream.includes('BIPC')) {
        if (career.category === 'Healthcare & Life Sciences' || career.title.includes('Bio')) {
          highlights.push('BiPC stream aligns with biomedical degrees and computational genomics');
          return 20.0;
        }
      } else if (stream.includes('MEC') || stream.includes('CEC')) {
        if (career.category === 'Business & Analytics' || career.title.includes('Analyst')) {
          highlights.push('Commerce & Economics stream aligns directly with B.Com, BBA, and business data analytics');
          return 20.0;
        }
      }
      return 14.5;
    }

    if (edu === 'Diploma') {
      if (career.category === 'Software & Cloud' || career.category === 'Core Engineering' || career.category === 'Security & Infrastructure') {
        highlights.push('Polytechnic diploma enables lateral entry into 2nd-year B.Tech or immediate technical technician roles');
        return 19.0;
      }
      return 14.0;
    }

    // College / B.Tech / Degree / PG
    const branch = `${profile.branch || ''} ${profile.degreeSpecialization || ''}`.toUpperCase();
    const matchesDegree = career.compatibleDegrees.some((deg) => branch.includes(deg.toUpperCase()) || deg.toUpperCase().includes(branch));

    if (matchesDegree) {
      highlights.push(`Your academic qualification (${branch.trim() || 'Degree'}) matches industry criteria`);
      return 20.0;
    }
    return 15.0;
  }

  private static calcSkillScore(profile: StudentProfileInput, career: CareerItem, highlights: string[], missingSkills: string[]): number {
    // 10th and 12th students are NOT penalized for lacking professional skills like Docker or Spring Boot
    if (profile.educationLevel === '10th' || profile.educationLevel === 'Intermediate / 12th') {
      return 17.5; // High school baseline score
    }

    const userSkills = (profile.technicalSkills || []).map((s) => s.toLowerCase().trim());
    if (career.requiredSkills.length === 0) return 16;

    let matched = 0;
    career.requiredSkills.forEach((req) => {
      const has = userSkills.some((us) => us.includes(req.toLowerCase()) || req.toLowerCase().includes(us));
      if (has) {
        matched++;
      } else {
        missingSkills.push(req);
      }
    });

    const ratio = matched / career.requiredSkills.length;
    const score = ratio * 20.0;

    if (matched > 0) {
      highlights.push(`Possesses ${matched} of ${career.requiredSkills.length} key industry tools in this domain`);
    }
    return score;
  }

  private static calcGoalScore(profile: StudentProfileInput, career: CareerItem, highlights: string[]): number {
    if (!profile.careerGoals || profile.careerGoals.length === 0) return 6.5;

    const goals = profile.careerGoals.map((g) => g.toLowerCase());
    let score = 5.0;

    if (goals.some((g) => g.includes('salary') || g.includes('compensation'))) {
      if (career.approxSalaryMaxLpa >= 20.0) {
        score += 3.0;
        highlights.push(`High earning potential (up to approx ₹${career.approxSalaryMaxLpa} LPA)`);
      }
    }
    if (goals.some((g) => g.includes('research') || g.includes('deep tech'))) {
      if (career.category === 'AI & Data' || career.title.includes('Scientist')) {
        score += 3.0;
      }
    }
    if (goals.some((g) => g.includes('remote') || g.includes('abroad'))) {
      if (career.category === 'Software & Cloud' || career.category === 'Design & Product') {
        score += 2.5;
      }
    }
    if (goals.some((g) => g.includes('government') || g.includes('security') || g.includes('psu'))) {
      if (career.category === 'Civil & Public Services' || career.category === 'Core Engineering') {
        score += 3.0;
        highlights.push('Matches interest in public service, state governance, and job security');
      }
    }
    return Math.min(10.0, score);
  }

  private static calcAcademicScore(profile: StudentProfileInput, career: CareerItem, highlights: string[]): number {
    let score = 6.0;
    const math = profile.mathPerformance || '';
    const science = profile.sciencePerformance || '';

    if (math === 'Strong') {
      if (career.importantAcademicSubjects.some((s) => s.toLowerCase().includes('math') || s.toLowerCase().includes('calculus') || s.toLowerCase().includes('statistics'))) {
        score += 2.5;
        highlights.push('Strong math foundation matches quantitative and computational prerequisites');
      }
    }
    if (science === 'Strong') {
      if (career.importantAcademicSubjects.some((s) => s.toLowerCase().includes('science') || s.toLowerCase().includes('physics') || s.toLowerCase().includes('circuit'))) {
        score += 1.5;
      }
    }
    return Math.min(10.0, score);
  }

  private static calcExperienceScore(profile: StudentProfileInput, career: CareerItem, highlights: string[]): number {
    if (profile.educationLevel === '10th' || profile.educationLevel === 'Intermediate / 12th') {
      return 8.5; // High school baseline
    }

    const projects = profile.projectCount || 0;
    const certs = profile.certificationCount || 0;

    const score = Math.min(6.0, projects * 2.0) + Math.min(4.0, certs * 2.0);
    if (projects > 0) {
      highlights.push(`${projects} hands-on project(s) demonstrate practical portfolio ability`);
    }
    return Math.min(10.0, score);
  }

  /**
   * Generates a personalized roadmap depending on the user's current education tier
   */
  public static generateRoadmap(profile: StudentProfileInput, career: CareerItem): RoadmapStageItem[] {
    const edu = profile.educationLevel;

    if (edu === '10th') {
      return [
        {
          stageNumber: 1,
          stageTitle: 'Higher Secondary Stream Selection (Next 2 Years)',
          duration: 'Years 1 - 2',
          focus: 'Choose MPC (Math, Physics, Chemistry) or a 3-Year Polytechnic Diploma in CSE',
          topics: ['Strong command of 11th/12th Algebra & Calculus', 'Physics problem solving', 'Introductory computational thinking'],
          actionItems: ['Enroll in 11th MPC or State Polytechnic Diploma', 'Maintain > 80% aggregate in school exams']
        },
        {
          stageNumber: 2,
          stageTitle: 'Undergraduate Entrance & Degree (Years 3 - 6)',
          duration: 'Years 3 - 6',
          focus: 'Pursue B.Tech CSE / AI / IT or BCA Degree',
          topics: ['Engineering entrance exams (JEE / State CET)', 'Core Computer Science coursework', 'Data Structures & Algorithms in Java / C++'],
          actionItems: ['Secure admission in an accredited degree program', 'Learn programming fundamentals in semester 1']
        },
        {
          stageNumber: 3,
          stageTitle: 'Domain Specialization & Projects',
          duration: 'College Year 2 - 3',
          focus: `Master the essential tools of a ${career.title}`,
          topics: career.requiredSkills.slice(0, 4),
          actionItems: ['Build 2 end-to-end portfolio projects', 'Create an active GitHub profile with documentation']
        },
        {
          stageNumber: 4,
          stageTitle: 'Industry Internships & Campus Placement',
          duration: 'Final College Year',
          focus: `Transition into ${career.entryLevelRoles[0] || 'Junior Associate'}`,
          topics: ['Interview preparation', 'Mock system design', 'Resume refinement'],
          actionItems: ['Apply to 3-6 month internships', 'Participate in campus placement interviews']
        }
      ];
    }

    if (edu === 'Intermediate / 12th') {
      return [
        {
          stageNumber: 1,
          stageTitle: 'Entrance Clearance & Degree Onboarding',
          duration: 'Year 1',
          focus: 'Get admitted to relevant graduation degree (B.Tech / BCA / B.Sc) and master coding',
          topics: ['C / Java Programming', 'Discrete Mathematics', 'Logic Building'],
          actionItems: ['Solve 50 coding problems on LeetCode/HackerRank', 'Setup development workstation (VS Code / IntelliJ)']
        },
        {
          stageNumber: 2,
          stageTitle: 'Specialized Skill Stack Building',
          duration: 'Year 2',
          focus: `Deep dive into ${career.title} technologies`,
          topics: career.requiredSkills.slice(0, 4),
          actionItems: ['Build full-stack CRUD applications', 'Learn Git version control and team collaboration']
        },
        {
          stageNumber: 3,
          stageTitle: 'Advanced Capstone & Hackathons',
          duration: 'Year 3',
          focus: 'Build deployable real-world solutions',
          topics: ['System design principles', 'Database optimization & caching', 'Cloud deployment'],
          actionItems: ['Publish 2 production projects on GitHub', 'Participate in at least 2 inter-college hackathons']
        },
        {
          stageNumber: 4,
          stageTitle: 'Campus Placement & Industry Entry',
          duration: 'Year 4',
          focus: `Secure offer as ${career.entryLevelRoles[0] || 'Associate'}`,
          topics: ['Data Structures & Algorithms drills', 'Behavioral and HR interview prep', 'Resume polishing'],
          actionItems: ['Target high-growth product companies and IT services', 'Accept campus placement offer']
        }
      ];
    }

    if (edu === 'Diploma') {
      return [
        {
          stageNumber: 1,
          stageTitle: 'Lateral Entry B.Tech or Direct Job Preparation',
          duration: 'Year 1',
          focus: 'Clear ECET for 2nd-year lateral entry OR target Junior Trainee developer openings',
          topics: ['Engineering Mathematics bridging', 'Core Java / Python', 'Basic Data Structures'],
          actionItems: ['Take State Lateral Entry exam or build portfolio site', 'Complete 1 foundational certification']
        },
        {
          stageNumber: 2,
          stageTitle: 'Practical Engineering & Project Acceleration',
          duration: 'Year 2',
          focus: `Master practical ${career.title} stack`,
          topics: career.requiredSkills,
          actionItems: ['Complete capstone team project', 'Deploy project online with live URL']
        },
        {
          stageNumber: 3,
          stageTitle: 'Industry Transition',
          duration: 'Final Year',
          focus: `Land full-time ${career.entryLevelRoles[0] || 'Technical Specialist'} role`,
          topics: ['Interview problem solving', 'System architecture basics', 'Communication skills'],
          actionItems: ['Apply via off-campus drives and company job boards']
        }
      ];
    }

    // B.Tech / Degree / PG students: fast, skills-focused roadmap
    return [
      {
        stageNumber: 1,
        stageTitle: 'Bridging Missing Skills & Frameworks',
        duration: 'Months 1 - 3',
        focus: `Master missing required competencies for ${career.title}`,
        topics: career.requiredSkills.slice(0, 4),
        actionItems: ['Complete hands-on tutorials and build 3 mini-modules', 'Implement clean unit tests']
      },
      {
        stageNumber: 2,
        stageTitle: 'Production-Grade Capstone Project',
        duration: 'Months 4 - 6',
        focus: 'Build an enterprise-grade project that stands out on your resume',
        topics: ['Scalable architecture', 'Database indexing & security', 'CI/CD pipeline'],
        actionItems: ['Deploy demo with documentation on AWS/Vercel/Render', 'Record a 3-minute video walkthrough']
      },
      {
        stageNumber: 3,
        stageTitle: 'Internships & Open Source Contribution',
        duration: 'Months 7 - 9',
        focus: 'Gain real codebase experience with peers',
        topics: ['Agile workflows', 'Pull request code reviews', 'API performance profiling'],
        actionItems: ['Contribute to open source or complete a 3-month internship', 'Request recommendation letters']
      },
      {
        stageNumber: 4,
        stageTitle: 'Targeted Hiring Rounds & Interview Drills',
        duration: 'Months 10 - 12',
        focus: `Land an offer as ${career.entryLevelRoles[0] || 'Engineer'}`,
        topics: ['Data Structures & Algorithms', 'System Design fundamentals', 'Mock interview rounds'],
        actionItems: ['Apply to 20+ targeted tech companies', 'Prepare behavioral STAR-method answers']
      }
    ];
  }

  /**
   * Skill Gap Analysis
   */
  public static analyzeSkillGap(profile: StudentProfileInput, career: CareerItem): SkillGapResult {
    const isSchool = profile.educationLevel === '10th' || profile.educationLevel === 'Intermediate / 12th';

    if (isSchool) {
      return {
        isSchoolStudent: true,
        readinessPercentage: 85,
        currentSkills: profile.favoriteSubjects || ['Mathematics', 'Science'],
        matchedSkills: ['Analytical Curiosity', 'Problem Solving Aptitude', 'Basic Computer Knowledge'],
        missingSkills: [],
        skillsToDevelopLater: [...career.requiredSkills],
        learningSequence: [
          'Basic Computational Thinking & Logic',
          'Introductory Programming (Python or Java)',
          'High School Applied Mathematics',
          'Technical Writing & Communication',
          'Basic Digital & Web Literacy'
        ]
      };
    }

    const userSkills = (profile.technicalSkills || []).map((s) => s.trim());
    const matched: string[] = [];
    const missing: string[] = [];

    career.requiredSkills.forEach((req) => {
      const has = userSkills.some((us) => us.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(us.toLowerCase()));
      if (has) {
        matched.push(req);
      } else {
        missing.push(req);
      }
    });

    const total = Math.max(1, career.requiredSkills.length);
    const readinessPercentage = Math.round((matched.length / total) * 100);

    // Learning sequence sorted by foundation -> framework -> devops
    const sequence = [...missing].sort((a, b) => {
      const rank = (s: string) => {
        const str = s.toLowerCase();
        if (str.includes('dsa') || str.includes('java') || str.includes('python') || str.includes('c++')) return 1;
        if (str.includes('sql') || str.includes('git') || str.includes('database')) return 2;
        if (str.includes('spring') || str.includes('react') || str.includes('api') || str.includes('rest')) return 3;
        if (str.includes('docker') || str.includes('cloud') || str.includes('aws') || str.includes('ci/cd')) return 4;
        return 5;
      };
      return rank(a) - rank(b);
    });

    return {
      isSchoolStudent: false,
      readinessPercentage,
      currentSkills: userSkills,
      matchedSkills: matched,
      missingSkills: missing,
      skillsToDevelopLater: [],
      learningSequence: sequence
    };
  }
}
