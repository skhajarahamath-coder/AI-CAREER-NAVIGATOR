import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Target, 
  Code, 
  Briefcase, 
  ArrowRight, 
  Check, 
  Plus, 
  Trash2, 
  HelpCircle,
  Award
} from 'lucide-react';
import { EducationLevel, StudentProfile, ProjectEntry, CertEntry } from '../types';

interface OnboardingModalProps {
  initialProfile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: StudentProfile) => void;
}

const EDUCATION_OPTIONS: { level: EducationLevel; label: string; desc: string }[] = [
  { level: '10th', label: '10th Standard (SSC / CBSE / ICSE)', desc: 'Secondary school student planning future stream choices' },
  { level: 'Intermediate / 12th', label: 'Intermediate / +2 / 12th', desc: 'MPC, BiPC, MEC, CEC, HEC, or Science/Commerce stream' },
  { level: 'Diploma', label: 'Polytechnic Diploma', desc: 'Technical diploma student planning lateral entry or industry entry' },
  { level: 'B.Tech / B.E', label: 'B.Tech / B.E Engineering', desc: 'Undergraduate engineering in CSE, ECE, Mech, IT, etc.' },
  { level: 'Degree', label: 'Degree (BCA, B.Sc, B.Com, BA)', desc: '3-year undergraduate degree in computer applications or sciences' },
  { level: 'Postgraduate', label: 'Postgraduate (MCA, M.Tech, MBA, MS)', desc: 'Masters degree student or aspiring researcher/specialist' }
];

const INTEREST_OPTIONS = [
  'Coding', 'Mathematics', 'Biology', 'Business', 'Design', 'Electronics',
  'Teaching', 'Creativity', 'Problem Solving', 'Communication', 'AI',
  'Web Development', 'Cybersecurity', 'Cloud', 'DevOps', 'Data Science', 'Mobile Apps'
];

const PERSONALITY_OPTIONS = [
  'Analytical', 'Creative', 'Leadership', 'Social Interaction',
  'Independent Work', 'Practical/Hands-on Work'
];

const GOAL_OPTIONS = [
  'High Salary', 'Job Security', 'Government Career', 'Research',
  'Entrepreneurship', 'Work Abroad', 'Helping People', 'Creative Career',
  'Remote Work', 'MNC Placements', 'Startup Culture'
];

const SKILL_SUGGESTIONS = [
  'Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML & CSS',
  'Spring Boot', 'React', 'Node.js', 'Git', 'Docker', 'AWS', 'Linux',
  'Data Structures & Algorithms', 'Machine Learning', 'Figma', 'Kubernetes'
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialProfile,
  isOpen,
  onClose,
  onSaveProfile
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [eduLevel, setEduLevel] = useState<EducationLevel>(initialProfile.educationLevel || 'B.Tech / B.E');
  
  // Stream & Branch
  const [stream, setStream] = useState<string>(initialProfile.stream || 'MPC');
  const [branch, setBranch] = useState<string>(initialProfile.branch || 'Computer Science and Engineering');
  const [degreeSpecialization, setDegreeSpecialization] = useState<string>(initialProfile.degreeSpecialization || 'BCA');
  const [currentYear, setCurrentYear] = useState<string>(initialProfile.currentYear || '3rd Year');
  const [cgpaPercentage, setCgpaPercentage] = useState<number>(initialProfile.cgpaPercentage || 8.2);
  const [backlogs, setBacklogs] = useState<number>(initialProfile.backlogs || 0);

  // High school performance
  const [academicPerformance, setAcademicPerformance] = useState<'Excellent' | 'Good' | 'Average'>(initialProfile.academicPerformance || 'Good');
  const [mathPerformance, setMathPerformance] = useState<'Strong' | 'Average' | 'Needs Improvement'>(initialProfile.mathPerformance || 'Strong');
  const [sciencePerformance, setSciencePerformance] = useState<'Strong' | 'Average' | 'Needs Improvement'>(initialProfile.sciencePerformance || 'Strong');
  const [englishPerformance, setEnglishPerformance] = useState<'Strong' | 'Average' | 'Needs Improvement'>(initialProfile.englishPerformance || 'Strong');
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>(initialProfile.favoriteSubjects || ['Mathematics', 'Computer Science']);

  // Interests & Goals
  const [interests, setInterests] = useState<string[]>(initialProfile.interests || ['Coding', 'Problem Solving']);
  const [personalityTraits, setPersonalityTraits] = useState<string[]>(initialProfile.personalityTraits || ['Analytical']);
  const [careerGoals, setCareerGoals] = useState<string[]>(initialProfile.careerGoals || ['High Salary', 'MNC Placements']);

  // Technical Skills (College only)
  const [technicalSkills, setTechnicalSkills] = useState<string[]>(initialProfile.technicalSkills || ['Java', 'SQL', 'Git']);
  const [newSkillInput, setNewSkillInput] = useState<string>('');

  // Projects (B.Tech / Degree / PG)
  const [projects, setProjects] = useState<ProjectEntry[]>(
    initialProfile.projects || [
      {
        name: 'Online Banking API',
        description: 'REST API with authentication and transactional accounts',
        technologies: 'Java, Spring Boot, MySQL',
        difficulty: 'Intermediate',
        isTeam: false,
        githubUrl: 'https://github.com/example/banking-api'
      }
    ]
  );
  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');

  // Preferences
  const [workEnvironmentPref, setWorkEnvironmentPref] = useState(initialProfile.workEnvironmentPref || 'Hybrid');
  const [higherEdPref, setHigherEdPref] = useState(initialProfile.higherEdPref || 'Immediate Job');
  const [studyAbroadInterest, setStudyAbroadInterest] = useState<boolean>(initialProfile.studyAbroadInterest || false);
  const [govtPrivatePref, setGovtPrivatePref] = useState(initialProfile.govtPrivatePref || 'Private MNC');

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !technicalSkills.includes(newSkillInput.trim())) {
      setTechnicalSkills([...technicalSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleAddProject = () => {
    if (newProjName.trim()) {
      setProjects([
        ...projects,
        {
          name: newProjName.trim(),
          description: newProjDesc.trim(),
          technologies: newProjTech.trim(),
          difficulty: 'Intermediate',
          isTeam: false
        }
      ]);
      setNewProjName('');
      setNewProjDesc('');
      setNewProjTech('');
    }
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const finalProfile: StudentProfile = {
      educationLevel: eduLevel,
      stream: eduLevel === 'Intermediate / 12th' ? stream : undefined,
      branch: (eduLevel === 'B.Tech / B.E' || eduLevel === 'Diploma') ? branch : undefined,
      degreeSpecialization: (eduLevel === 'Degree' || eduLevel === 'Postgraduate') ? degreeSpecialization : undefined,
      currentYear,
      cgpaPercentage: (eduLevel !== '10th') ? cgpaPercentage : undefined,
      backlogs: (eduLevel === 'B.Tech / B.E' || eduLevel === 'Diploma') ? backlogs : 0,
      academicPerformance,
      mathPerformance,
      sciencePerformance,
      englishPerformance,
      favoriteSubjects,
      interests,
      personalityTraits,
      careerGoals,
      technicalSkills: (eduLevel !== '10th' && eduLevel !== 'Intermediate / 12th') ? technicalSkills : [],
      projects: (eduLevel === 'B.Tech / B.E' || eduLevel === 'Degree' || eduLevel === 'Postgraduate') ? projects : [],
      projectCount: (eduLevel === 'B.Tech / B.E' || eduLevel === 'Degree' || eduLevel === 'Postgraduate') ? projects.length : 0,
      workEnvironmentPref,
      higherEdPref,
      studyAbroadInterest,
      govtPrivatePref
    };

    onSaveProfile(finalProfile);
    onClose();
  };

  const isSchoolStage = eduLevel === '10th' || eduLevel === 'Intermediate / 12th';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Adaptive Profile Questionnaire</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Step {step} of 3
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Questions dynamically adjust to your exact academic stage
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700"
          >
            Cancel
          </button>
        </div>

        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-6">
          
          {/* STEP 1: Current Education Level */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  1. What is your current education level?
                </h3>
                <p className="text-xs text-slate-400">
                  This single choice completely shapes the subsequent questions and career pathways.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EDUCATION_OPTIONS.map((opt) => (
                  <div
                    key={opt.level}
                    onClick={() => setEduLevel(opt.level)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      eduLevel === opt.level
                        ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500'
                        : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-sm text-white">{opt.label}</span>
                      {eduLevel === opt.level && (
                        <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start space-x-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/90 leading-relaxed">
                  <strong>Adaptive Rule:</strong> For 10th & 12th students, the engine will never ask for professional Git repositories or certifications. For college graduates, deep technical skills and projects will unlock higher match precision.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Academic & Stream Specifics */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-2">
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wide">
                  Tier: {eduLevel}
                </span>
                <h3 className="text-sm font-bold text-white">
                  Academic Information & Subject Strengths
                </h3>
              </div>

              {/* 10TH STUDENT FLOW */}
              {eduLevel === '10th' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Mathematics Performance</label>
                      <select 
                        value={mathPerformance} 
                        onChange={(e) => setMathPerformance(e.target.value as any)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="Strong">Strong (Enjoys solving sums)</option>
                        <option value="Average">Average (Comfortable)</option>
                        <option value="Needs Improvement">Needs Improvement</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Science Performance</label>
                      <select 
                        value={sciencePerformance} 
                        onChange={(e) => setSciencePerformance(e.target.value as any)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="Strong">Strong (Physics/Chem/Bio)</option>
                        <option value="Average">Average</option>
                        <option value="Needs Improvement">Needs Improvement</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">English Performance</label>
                      <select 
                        value={englishPerformance} 
                        onChange={(e) => setEnglishPerformance(e.target.value as any)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="Strong">Strong Communication</option>
                        <option value="Average">Average</option>
                        <option value="Needs Improvement">Needs Improvement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Overall Academic Performance</label>
                    <select 
                      value={academicPerformance} 
                      onChange={(e) => setAcademicPerformance(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      <option value="Excellent">Above 85% / Grade A+</option>
                      <option value="Good">70% - 85% / Grade A/B</option>
                      <option value="Average">50% - 70% / Grade C</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 12TH / INTERMEDIATE FLOW */}
              {eduLevel === 'Intermediate / 12th' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Stream Selection</label>
                      <select 
                        value={stream} 
                        onChange={(e) => setStream(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="MPC">MPC (Mathematics, Physics, Chemistry)</option>
                        <option value="BiPC">BiPC (Biology, Physics, Chemistry)</option>
                        <option value="MEC">MEC (Mathematics, Economics, Commerce)</option>
                        <option value="CEC">CEC (Civics, Economics, Commerce)</option>
                        <option value="HEC">HEC (History, Economics, Civics)</option>
                        <option value="Other">Other Vocational Stream</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Academic Performance</label>
                      <select 
                        value={academicPerformance} 
                        onChange={(e) => setAcademicPerformance(e.target.value as any)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="Excellent">Excellent (&gt; 85%)</option>
                        <option value="Good">Good (70% - 85%)</option>
                        <option value="Average">Average (55% - 70%)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Higher Education Preference</label>
                      <select 
                        value={higherEdPref} 
                        onChange={(e) => setHigherEdPref(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="B.Tech / Engineering">B.Tech / Engineering</option>
                        <option value="BCA / Computer Applications">BCA / Computer Applications</option>
                        <option value="B.Sc / Pure Sciences">B.Sc / Pure Sciences</option>
                        <option value="B.Com / BBA / Business">B.Com / BBA / Business</option>
                        <option value="Medical / Pharmacy">Medical / Pharmacy</option>
                        <option value="Undecided">Undecided / Exploring</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Interest in Studying Abroad</label>
                      <select 
                        value={studyAbroadInterest ? 'Yes' : 'No'} 
                        onChange={(e) => setStudyAbroadInterest(e.target.value === 'Yes')}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="No">No (Study in India)</option>
                        <option value="Yes">Yes (Interested in UG/PG Abroad)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* DIPLOMA FLOW */}
              {eduLevel === 'Diploma' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Diploma Branch</label>
                      <input 
                        type="text" 
                        value={branch} 
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="e.g. Computer Engineering, ECE, Mechanical"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Current Year</label>
                      <select 
                        value={currentYear} 
                        onChange={(e) => setCurrentYear(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year (Final)">3rd Year (Final)</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Next Step Preference</label>
                    <select 
                      value={higherEdPref} 
                      onChange={(e) => setHigherEdPref(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      <option value="Lateral Entry B.Tech">Lateral Entry into 2nd-Year B.Tech (ECET/JELET)</option>
                      <option value="Direct Industry Job">Direct Employment / Technician / Junior Developer</option>
                      <option value="Certification & Upskilling">Certification & Private Upskilling Bootcamps</option>
                    </select>
                  </div>
                </div>
              )}

              {/* B.TECH / B.E FLOW */}
              {eduLevel === 'B.Tech / B.E' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Engineering Branch</label>
                      <select 
                        value={branch} 
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="Computer Science and Engineering">Computer Science & Engineering (CSE)</option>
                        <option value="AI & Machine Learning">AI & Machine Learning (CSE-AIML)</option>
                        <option value="Information Technology">Information Technology (IT)</option>
                        <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electrical & Electronics">Electrical & Electronics (EEE)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Current Year</label>
                      <select 
                        value={currentYear} 
                        onChange={(e) => setCurrentYear(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year (Final)">4th Year (Final)</option>
                        <option value="Recent Graduate">Recent Graduate</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Current CGPA (out of 10)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="4" 
                        max="10" 
                        value={cgpaPercentage}
                        onChange={(e) => setCgpaPercentage(parseFloat(e.target.value) || 8.0)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Active Backlogs</label>
                      <select 
                        value={backlogs} 
                        onChange={(e) => setBacklogs(parseInt(e.target.value, 10))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value={0}>0 (Clean Academic Record)</option>
                        <option value={1}>1 Backlog</option>
                        <option value={2}>2 Backlogs</option>
                        <option value={3}>3+ Backlogs</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* DEGREE FLOW (BCA, B.Sc, etc.) */}
              {eduLevel === 'Degree' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Degree Type</label>
                      <select 
                        value={degreeSpecialization} 
                        onChange={(e) => setDegreeSpecialization(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                        <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                        <option value="B.Sc Mathematics / Statistics">B.Sc Mathematics / Statistics</option>
                        <option value="B.Com (Computers / Analytics)">B.Com (Computers / Analytics)</option>
                        <option value="BBA">BBA (Business Administration)</option>
                        <option value="BA">BA (Arts / Humanities)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Current Year</label>
                      <select 
                        value={currentYear} 
                        onChange={(e) => setCurrentYear(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year (Final)">3rd Year (Final)</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* POSTGRADUATE FLOW */}
              {eduLevel === 'Postgraduate' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Master Degree</label>
                      <select 
                        value={degreeSpecialization} 
                        onChange={(e) => setDegreeSpecialization(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="MCA">MCA (Master of Computer Applications)</option>
                        <option value="M.Tech CSE / AI">M.Tech CSE / AI</option>
                        <option value="M.Sc Data Science / CS">M.Sc Data Science / CS</option>
                        <option value="MBA Tech / Analytics">MBA (Tech / Analytics / Finance)</option>
                        <option value="MS / Ph.D">MS / Ph.D Researcher</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Current Status / Role</label>
                      <input 
                        type="text" 
                        value={currentYear} 
                        onChange={(e) => setCurrentYear(e.target.value)}
                        placeholder="e.g. 2nd Year Master Student / Working Professional"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TECHNICAL SKILLS SECTION (Only for Diploma, B.Tech, Degree, PG) */}
              {!isSchoolStage && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <label className="block text-xs font-semibold text-white">
                    Your Current Technical Skills
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {technicalSkills.map((skill) => (
                      <span 
                        key={skill}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                      >
                        <span>{skill}</span>
                        <button 
                          onClick={() => setTechnicalSkills(technicalSkills.filter((s) => s !== skill))}
                          className="hover:text-red-400 ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Add a skill (e.g. Spring Boot, Docker, React, DSA)..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <button 
                      onClick={handleAddSkill}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Quick Skill Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-[10px] text-slate-400 py-0.5">Quick add:</span>
                    {SKILL_SUGGESTIONS.filter((s) => !technicalSkills.includes(s)).slice(0, 8).map((s) => (
                      <button
                        key={s}
                        onClick={() => setTechnicalSkills([...technicalSkills, s])}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PROJECTS SECTION (For B.Tech / Degree / PG) */}
              {(eduLevel === 'B.Tech / B.E' || eduLevel === 'Degree' || eduLevel === 'Postgraduate') && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white">
                      Portfolio Projects ({projects.length})
                    </label>
                    <span className="text-[11px] text-slate-400">Boosts experience match score</span>
                  </div>

                  <div className="space-y-2">
                    {projects.map((proj, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white">{proj.name}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                              {proj.technologies}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{proj.description}</p>
                        </div>
                        <button 
                          onClick={() => handleRemoveProject(idx)}
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Project inline inputs */}
                  <div className="p-3 rounded-lg bg-slate-800/40 border border-dashed border-slate-700 space-y-2">
                    <input 
                      type="text"
                      placeholder="Project title (e.g. E-Commerce Platform API)"
                      value={newProjName}
                      onChange={(e) => setNewProjName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input 
                        type="text"
                        placeholder="Technologies (e.g. Spring Boot, MySQL, React)"
                        value={newProjTech}
                        onChange={(e) => setNewProjTech(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                      />
                      <input 
                        type="text"
                        placeholder="Brief summary"
                        value={newProjDesc}
                        onChange={(e) => setNewProjDesc(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <button 
                      onClick={handleAddProject}
                      disabled={!newProjName.trim()}
                      className="w-full py-1 text-xs font-medium rounded bg-slate-700 hover:bg-slate-600 text-slate-200 disabled:opacity-50"
                    >
                      + Add Project to Portfolio
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Interests, Personality & Goals */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-2">
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wide">
                  Weight: 30% Interest + 10% Goal + Personality
                </span>
                <h3 className="text-sm font-bold text-white">
                  Interests, Personality & Career Ambitions
                </h3>
              </div>

              {/* Interests Selector */}
              <div>
                <label className="block text-xs font-semibold text-white mb-2">
                  Select your core interests & passions (30% weight)
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((item) => {
                    const isSelected = interests.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleItem(interests, setInterests, item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                            : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700/80'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personality Traits */}
              <div>
                <label className="block text-xs font-semibold text-white mb-2">
                  Work Style & Personality Tendencies
                </label>
                <div className="flex flex-wrap gap-2">
                  {PERSONALITY_OPTIONS.map((item) => {
                    const isSelected = personalityTraits.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleItem(personalityTraits, setPersonalityTraits, item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/30'
                            : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700/80'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Career Goals */}
              <div>
                <label className="block text-xs font-semibold text-white mb-2">
                  Primary Career Goals & Aspirations (10% weight)
                </label>
                <div className="flex flex-wrap gap-2">
                  {GOAL_OPTIONS.map((item) => {
                    const isSelected = careerGoals.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleItem(careerGoals, setCareerGoals, item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                            : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700/80'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Work Environment & Sector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Environment</label>
                  <select 
                    value={workEnvironmentPref}
                    onChange={(e) => setWorkEnvironmentPref(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="Hybrid">Hybrid (Mix of office & home)</option>
                    <option value="Remote">100% Remote / Work from anywhere</option>
                    <option value="Office / Tech Campus">Office / Tech Campus</option>
                    <option value="Field & Laboratory">Field / Laboratory / Research Facility</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Sector Preference</label>
                  <select 
                    value={govtPrivatePref}
                    onChange={(e) => setGovtPrivatePref(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="Private MNC">Private Product & Tech MNCs</option>
                    <option value="Government / PSU">Government / PSU / Public Service</option>
                    <option value="High-Growth Startup">High-Growth Tech Startup</option>
                    <option value="Flexible / Open">Flexible / Open to All</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Controls */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              Back
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-mono">Stage: 1 of 3</span>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center space-x-1.5 shadow-lg shadow-indigo-600/20"
            >
              <span>Next: {step === 1 ? 'Academics' : 'Interests & Goals'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white flex items-center space-x-1.5 shadow-lg shadow-emerald-600/20"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Run Java Matching Engine</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
