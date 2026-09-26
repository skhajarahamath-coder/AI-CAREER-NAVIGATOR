import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { CAREERS_DATABASE } from './server/data/careersDatabase';
import { CareerRecommendationEngine, StudentProfileInput } from './server/engine/recommendationEngine';
import { GeminiService } from './server/services/geminiService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory student profile session store for demo convenience
let currentActiveProfile: StudentProfileInput = {
  educationLevel: 'B.Tech / B.E',
  branch: 'Computer Science and Engineering',
  currentYear: '3rd Year',
  cgpaPercentage: 8.4,
  backlogs: 0,
  academicPerformance: 'Good',
  mathPerformance: 'Strong',
  sciencePerformance: 'Strong',
  englishPerformance: 'Strong',
  interests: ['Coding', 'Problem Solving', 'Cloud', 'Algorithms'],
  personalityTraits: ['Analytical', 'Practical/hands-on work'],
  careerGoals: ['High salary', 'MNC', 'Remote work'],
  technicalSkills: ['Java', 'SQL', 'HTML', 'Git'],
  projectCount: 2,
  certificationCount: 1,
  workEnvironmentPref: 'Hybrid',
  higherEdPref: 'Immediate Job',
  govtPrivatePref: 'Private MNC'
};

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

// 1. Get all careers or filter by category
app.get('/api/careers', (req: Request, res: Response) => {
  const category = req.query.category as string;
  if (category && category.trim() !== '' && category !== 'All') {
    const filtered = CAREERS_DATABASE.filter(
      (c) => c.category.toLowerCase() === category.toLowerCase()
    );
    return res.json(filtered);
  }
  return res.json(CAREERS_DATABASE);
});

// 2. Get single career by ID or Code
app.get('/api/careers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const career = CAREERS_DATABASE.find((c) => c.id === id || c.code === id);
  if (!career) {
    return res.status(404).json({ error: 'Career not found' });
  }
  return res.json(career);
});

// 3. Get / Update Current Student Profile
app.get('/api/profile', (req: Request, res: Response) => {
  return res.json(currentActiveProfile);
});

app.post('/api/profile', (req: Request, res: Response) => {
  const updated = req.body as StudentProfileInput;
  if (!updated || !updated.educationLevel) {
    return res.status(400).json({ error: 'Valid education level is required' });
  }
  currentActiveProfile = updated;
  return res.json({ message: 'Profile updated successfully', profile: currentActiveProfile });
});

// 4. Recommendation Engine Evaluation (Java Weighted Matching)
app.post('/api/recommendations/evaluate', (req: Request, res: Response) => {
  const profile: StudentProfileInput = req.body.profile || currentActiveProfile;
  const limit = parseInt(req.body.limit as string, 10) || 5;

  const ranked = CareerRecommendationEngine.rankCareers(profile);
  const topMatches = ranked.slice(0, limit);

  return res.json({
    totalEvaluated: ranked.length,
    profile,
    topMatches,
    allMatches: ranked
  });
});

// 5. Generate Personalized Roadmap for a Career
app.post('/api/recommendations/roadmap/:careerId', (req: Request, res: Response) => {
  const { careerId } = req.params;
  const profile: StudentProfileInput = req.body.profile || currentActiveProfile;
  const career = CAREERS_DATABASE.find((c) => c.id === careerId || c.code === careerId);

  if (!career) {
    return res.status(404).json({ error: 'Career not found' });
  }

  const stages = CareerRecommendationEngine.generateRoadmap(profile, career);
  return res.json({
    careerId: career.id,
    careerTitle: career.title,
    educationLevel: profile.educationLevel,
    stages,
    alternativeRoutes: career.alternativeRoutes
  });
});

// 6. Skill Gap Analysis
app.post('/api/recommendations/skill-gap/:careerId', (req: Request, res: Response) => {
  const { careerId } = req.params;
  const profile: StudentProfileInput = req.body.profile || currentActiveProfile;
  const career = CAREERS_DATABASE.find((c) => c.id === careerId || c.code === careerId);

  if (!career) {
    return res.status(404).json({ error: 'Career not found' });
  }

  const report = CareerRecommendationEngine.analyzeSkillGap(profile, career);
  return res.json({
    careerId: career.id,
    careerTitle: career.title,
    report
  });
});

// 7. AI Career Explanation (Gemini)
app.post('/api/ai/explain', async (req: Request, res: Response) => {
  try {
    const { careerId, profile: reqProfile, breakdown } = req.body;
    const profile = reqProfile || currentActiveProfile;
    const career = CAREERS_DATABASE.find((c) => c.id === careerId || c.code === careerId);

    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }

    const explanation = await GeminiService.explainCareerMatch(career, profile, breakdown);
    return res.json({ explanation });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'AI explanation error' });
  }
});

// 8. AI Career Guidance Chatbot
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const reply = await GeminiService.chatCareerAssistant(currentActiveProfile, message, history || []);
    return res.json({ reply });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'AI chat error' });
  }
});

// 9. AI Resume Text Analyzer
app.post('/api/ai/resume-analyze', async (req: Request, res: Response) => {
  try {
    const { resumeText, targetCareerTitle } = req.body;
    if (!resumeText || resumeText.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide valid resume text (at least 20 characters)' });
    }

    const analysis = await GeminiService.analyzeResumeText(resumeText, targetCareerTitle || 'Software Engineer');
    return res.json(analysis);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Resume analysis error' });
  }
});

// 10. Java Source Code Inspector Endpoint (Allows user to inspect the Spring Boot 3 files in the UI!)
app.get('/api/java-code', (req: Request, res: Response) => {
  try {
    const files = [
      {
        path: 'backend-java/pom.xml',
        title: 'pom.xml (Spring Boot 3 + Java 21)',
        lang: 'xml',
        content: fs.existsSync(path.join(__dirname, 'backend-java/pom.xml'))
          ? fs.readFileSync(path.join(__dirname, 'backend-java/pom.xml'), 'utf-8')
          : ''
      },
      {
        path: 'backend-java/src/main/resources/schema.sql',
        title: 'schema.sql (MySQL Relational Tables)',
        lang: 'sql',
        content: fs.existsSync(path.join(__dirname, 'backend-java/src/main/resources/schema.sql'))
          ? fs.readFileSync(path.join(__dirname, 'backend-java/src/main/resources/schema.sql'), 'utf-8')
          : ''
      },
      {
        path: 'backend-java/src/main/java/com/career/navigator/engine/CareerRecommendationEngine.java',
        title: 'CareerRecommendationEngine.java (Pure Java Weighted Algorithm)',
        lang: 'java',
        content: fs.existsSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/engine/CareerRecommendationEngine.java'))
          ? fs.readFileSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/engine/CareerRecommendationEngine.java'), 'utf-8')
          : ''
      },
      {
        path: 'backend-java/src/main/java/com/career/navigator/engine/RoadmapGeneratorEngine.java',
        title: 'RoadmapGeneratorEngine.java (Personalized Roadmap Generation)',
        lang: 'java',
        content: fs.existsSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/engine/RoadmapGeneratorEngine.java'))
          ? fs.readFileSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/engine/RoadmapGeneratorEngine.java'), 'utf-8')
          : ''
      },
      {
        path: 'backend-java/src/main/java/com/career/navigator/engine/SkillGapAnalyzer.java',
        title: 'SkillGapAnalyzer.java (Adaptive Skill Gap Logic)',
        lang: 'java',
        content: fs.existsSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/engine/SkillGapAnalyzer.java'))
          ? fs.readFileSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/engine/SkillGapAnalyzer.java'), 'utf-8')
          : ''
      },
      {
        path: 'backend-java/src/main/java/com/career/navigator/service/GeminiAiService.java',
        title: 'GeminiAiService.java (Spring Boot Gemini Integration)',
        lang: 'java',
        content: fs.existsSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/service/GeminiAiService.java'))
          ? fs.readFileSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/service/GeminiAiService.java'), 'utf-8')
          : ''
      },
      {
        path: 'backend-java/src/main/java/com/career/navigator/controller/CareerController.java',
        title: 'CareerController.java (Spring MVC REST API)',
        lang: 'java',
        content: fs.existsSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/controller/CareerController.java'))
          ? fs.readFileSync(path.join(__dirname, 'backend-java/src/main/java/com/career/navigator/controller/CareerController.java'), 'utf-8')
          : ''
      }
    ];
    return res.json(files);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to read Java files: ' + err.message });
  }
});

// -------------------------------------------------------------
// VITE DEV SERVER OR PRODUCTION STATIC SERVING
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` AI Career Navigator Server running on port ${PORT}`);
    console.log(` Java 21 Spring Boot Codebase in: /backend-java`);
    console.log(` Full-stack API & Vite Applet Active`);
    console.log(`====================================================`);
  });
}

startServer();
