export interface CareerRoute {
  routeCode: string; // e.g. "Route A"
  title: string;
  targetAudience: string;
  description: string;
  steps: string[];
}

export interface ProjectSuggestion {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  technologies: string[];
}

export interface CertificationSuggestion {
  category: string;
  title: string;
  provider: string;
  level: 'Foundational' | 'Associate' | 'Professional';
}

export interface CareerItem {
  id: string;
  code: string;
  title: string;
  category: 'Software & Cloud' | 'AI & Data' | 'Security & Infrastructure' | 'Core Engineering' | 'Design & Product' | 'Business & Analytics' | 'Healthcare & Life Sciences' | 'Civil & Public Services';
  description: string;
  beginnerDifficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Advanced';
  preferredEducationLevels: string[];
  compatibleDegrees: string[];
  relatedInterests: string[];
  importantAcademicSubjects: string[];
  requiredSkills: string[];
  entryLevelRoles: string[];
  advancedRoles: string[];
  approxSalaryMinLpa: number;
  approxSalaryMaxLpa: number;
  salaryReferenceSource: string;
  alternativeRoutes: CareerRoute[];
  recommendedProjects: ProjectSuggestion[];
  recommendedCertifications: CertificationSuggestion[];
}

export const CAREERS_DATABASE: CareerItem[] = [
  {
    id: 'c1',
    code: 'software_engineer',
    title: 'Software Engineer',
    category: 'Software & Cloud',
    description: 'Designs, develops, tests, and maintains robust software systems, enterprise backend services, and scalable web applications.',
    beginnerDifficulty: 'Moderate',
    preferredEducationLevels: ['10th', 'Intermediate / 12th', 'Diploma', 'B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['B.Tech CSE', 'B.Tech IT', 'B.Tech ECE', 'BCA', 'MCA', 'B.Sc Computer Science', 'M.Tech CSE'],
    relatedInterests: ['Coding', 'Problem Solving', 'Web Development', 'Cloud', 'Algorithms', 'Mathematics'],
    importantAcademicSubjects: ['Mathematics', 'Computer Science', 'Data Structures & Algorithms'],
    requiredSkills: ['Java', 'SQL', 'Git', 'Spring Boot', 'REST APIs', 'Data Structures & Algorithms', 'System Design'],
    entryLevelRoles: ['Junior Software Engineer', 'Associate Software Engineer', 'Graduate Software Trainee'],
    advancedRoles: ['Senior Software Engineer', 'Staff Engineer', 'Principal Architect', 'Engineering Manager'],
    approxSalaryMinLpa: 6.0,
    approxSalaryMaxLpa: 24.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Traditional Engineering Route',
        targetAudience: '12th MPC or Direct 4-Year B.Tech students',
        description: 'Direct university admission followed by competitive coding and campus placement.',
        steps: ['B.Tech CSE / IT', 'Master Data Structures & Java/C++', 'Spring Boot & Enterprise Projects', 'Summer Internship', 'Campus Placement']
      },
      {
        routeCode: 'Route B',
        title: 'Computer Applications Route',
        targetAudience: 'BCA or Non-engineering Math/Science graduates',
        description: '3-year BCA followed by MCA or immediate practical portfolio building.',
        steps: ['BCA Degree', 'Backend Specialization (Java / Node.js)', 'MCA or Applied Certification', '2 Production Projects on GitHub', 'Off-campus Tech Drives']
      },
      {
        routeCode: 'Route C',
        title: 'Polytechnic Diploma to Lateral B.Tech',
        targetAudience: '10th pass polytechnic students',
        description: '3-year hands-on diploma with direct lateral admission to 2nd year B.Tech.',
        steps: ['Diploma in Computer Engineering', 'State Lateral Entry ECET Exam', 'Join B.Tech in 2nd Year', 'Industry Internship', 'Junior Developer Role']
      }
    ],
    recommendedProjects: [
      {
        title: 'Banking & Transaction REST API',
        difficulty: 'Intermediate',
        description: 'Build a secure multi-account financial transaction API with JWT authentication, ACID transactions, and audit logs.',
        technologies: ['Java 21', 'Spring Boot 3', 'PostgreSQL / MySQL', 'Docker']
      },
      {
        title: 'E-Commerce Backend Microservice',
        difficulty: 'Advanced',
        description: 'Event-driven catalog, order processing, and payment gateway integration with distributed caching.',
        technologies: ['Spring Boot', 'Redis', 'Kafka / RabbitMQ', 'Docker']
      },
      {
        title: 'Hospital Management System API',
        difficulty: 'Intermediate',
        description: 'Role-based access system for doctors, patients, appointments, and diagnostic reports with input validation.',
        technologies: ['Java', 'Spring Data JPA', 'MySQL', 'Swagger / OpenAPI']
      },
      {
        title: 'Real-Time Chat & Notification Service',
        difficulty: 'Intermediate',
        description: 'Scalable WebSocket messaging broker supporting private chats, group channels, and message persistence.',
        technologies: ['WebSocket', 'Spring Boot', 'STOMP', 'Redis Pub/Sub']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Programming & Frameworks',
        title: 'Oracle Certified Professional: Java SE Developer',
        provider: 'Oracle',
        level: 'Professional'
      },
      {
        category: 'Cloud Fundamentals',
        title: 'AWS Certified Cloud Practitioner',
        provider: 'Amazon Web Services',
        level: 'Foundational'
      },
      {
        category: 'Software Engineering',
        title: 'Spring Certified Professional',
        provider: 'VMware / Broadcom',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c2',
    code: 'ai_engineer',
    title: 'AI & Machine Learning Engineer',
    category: 'AI & Data',
    description: 'Builds neural networks, machine learning models, predictive pipelines, and generative AI agents that automate complex tasks.',
    beginnerDifficulty: 'Challenging',
    preferredEducationLevels: ['Intermediate / 12th', 'B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['B.Tech CSE (AI/ML)', 'B.Tech Data Science', 'B.Tech CSE', 'M.Tech AI', 'M.Sc Data Science', 'MS / Ph.D'],
    relatedInterests: ['AI', 'Mathematics', 'Data Science', 'Problem Solving', 'Research', 'Coding'],
    importantAcademicSubjects: ['Linear Algebra', 'Multivariate Calculus', 'Probability & Statistics', 'Algorithms'],
    requiredSkills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'NumPy & Pandas', 'Data Structures & Algorithms', 'MLOps & Docker'],
    entryLevelRoles: ['Junior ML Engineer', 'Associate AI Developer', 'Data Science Analyst'],
    advancedRoles: ['Lead AI Scientist', 'VP of Artificial Intelligence', 'Principal Research Engineer'],
    approxSalaryMinLpa: 8.5,
    approxSalaryMaxLpa: 36.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Engineering Specialization Route',
        targetAudience: 'B.Tech CSE / AI graduates',
        description: 'Rigorous mathematical grounding followed by deep learning frameworks and ML system design.',
        steps: ['B.Tech CSE (AI/ML)', 'Master Python, PyTorch & Math', 'Build ML Portfolio on Kaggle/GitHub', 'Research Internship / AI Fellowship', 'AI Engineer Role']
      },
      {
        routeCode: 'Route B',
        title: 'Math & Statistics to Data Science',
        targetAudience: 'B.Sc Mathematics / Statistics graduates',
        description: 'Leveraging strong mathematical background to master machine learning algorithms and quantitative modeling.',
        steps: ['B.Sc Math / Stats', 'M.Sc Data Science or MCA', 'Applied ML Projects & Model Tuning', 'MLOps Tools (MLflow, Docker)', 'Junior ML Practitioner']
      }
    ],
    recommendedProjects: [
      {
        title: 'Personalized Movie & Course Recommendation Engine',
        difficulty: 'Intermediate',
        description: 'Hybrid collaborative filtering and content-based embedding recommendation engine with FastAPI backend.',
        technologies: ['Python', 'Scikit-learn', 'PyTorch', 'FastAPI']
      },
      {
        title: 'Financial Fraud Detection Pipeline',
        difficulty: 'Advanced',
        description: 'Imbalanced classification pipeline using XGBoost and LightGBM with real-time inference streaming.',
        technologies: ['Python', 'XGBoost', 'Kafka', 'Pandas', 'Docker']
      },
      {
        title: 'Medical Image Classification (X-Ray Diagnostics)',
        difficulty: 'Advanced',
        description: 'Transfer learning with Vision Transformers / ResNet for multi-label chest pathology detection.',
        technologies: ['PyTorch', 'Torchvision', 'Hugging Face', 'Streamlit']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Machine Learning',
        title: 'TensorFlow Developer Certificate',
        provider: 'Google / DeepLearning.AI',
        level: 'Associate'
      },
      {
        category: 'Cloud AI',
        title: 'AWS Certified Machine Learning - Specialty',
        provider: 'Amazon Web Services',
        level: 'Professional'
      },
      {
        category: 'Data & AI',
        title: 'Deep Learning Specialization',
        provider: 'DeepLearning.AI',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c3',
    code: 'data_scientist',
    title: 'Data Scientist',
    category: 'AI & Data',
    description: 'Transforms vast raw datasets into predictive insights, business intelligence models, and statistical forecasts using machine learning and analytics.',
    beginnerDifficulty: 'Moderate',
    preferredEducationLevels: ['B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['B.Tech CSE', 'B.Sc Statistics / Math', 'BCA', 'B.Com Analytics', 'M.Sc Data Science', 'MBA Business Analytics'],
    relatedInterests: ['Data Science', 'Mathematics', 'Business', 'Problem Solving', 'Research'],
    importantAcademicSubjects: ['Statistics & Probability', 'Linear Algebra', 'Business Economics'],
    requiredSkills: ['Python / R', 'SQL', 'Pandas & NumPy', 'Machine Learning', 'Data Visualization (Tableau/Power BI)', 'Statistical Hypothesis Testing'],
    entryLevelRoles: ['Junior Data Scientist', 'Data Analytics Associate', 'BI Developer'],
    advancedRoles: ['Principal Data Scientist', 'Head of Analytics', 'Chief Data Officer'],
    approxSalaryMinLpa: 7.0,
    approxSalaryMaxLpa: 28.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Tech to Data Science',
        targetAudience: 'Engineering and Computer Application students',
        description: 'Blend programming aptitude with statistical methods and business metrics.',
        steps: ['B.Tech or BCA', 'Master SQL & Python Analytics', 'Exploratory Data Analysis Projects', 'Kaggle Competitions', 'Data Scientist Trainee']
      },
      {
        routeCode: 'Route B',
        title: 'Commerce/Economics to Analytics',
        targetAudience: 'B.Com / BBA / Economics graduates',
        description: 'Combine domain business intuition with technical tools like SQL, Python, and Power BI.',
        steps: ['Degree in Commerce / Economics', 'Learn SQL & Python for Data Science', 'MBA Analytics or M.Sc', 'Business Case Studies', 'Commercial Data Scientist']
      }
    ],
    recommendedProjects: [
      {
        title: 'Customer Churn Prediction & Retention Analytics',
        difficulty: 'Intermediate',
        description: 'End-to-end classification model evaluating telecom churn with SHAP explainability and interactive dashboard.',
        technologies: ['Python', 'Scikit-learn', 'SHAP', 'Streamlit', 'PostgreSQL']
      },
      {
        title: 'Dynamic Retail Demand Forecasting',
        difficulty: 'Intermediate',
        description: 'Time-series forecasting model (Prophet / ARIMA / LSTM) for supply chain inventory optimization.',
        technologies: ['Python', 'Statsmodels', 'Prophet', 'Pandas']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Data Science',
        title: 'IBM Data Science Professional Certificate',
        provider: 'IBM',
        level: 'Associate'
      },
      {
        category: 'Cloud Analytics',
        title: 'Google Cloud Professional Data Engineer',
        provider: 'Google Cloud',
        level: 'Professional'
      }
    ]
  },
  {
    id: 'c4',
    code: 'cloud_devops_engineer',
    title: 'Cloud & DevOps Engineer',
    category: 'Software & Cloud',
    description: 'Architects resilient cloud infrastructure on AWS/Azure/GCP, automates CI/CD deployment pipelines, and manages containerized microservices.',
    beginnerDifficulty: 'Moderate',
    preferredEducationLevels: ['Diploma', 'B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['B.Tech CSE', 'B.Tech IT', 'B.Tech ECE', 'Diploma in CSE/ECE', 'BCA', 'MCA'],
    relatedInterests: ['Cloud', 'DevOps', 'Coding', 'Networking', 'Problem Solving'],
    importantAcademicSubjects: ['Computer Networks', 'Operating Systems', 'Linux Administration'],
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD (GitHub Actions / Jenkins)', 'Terraform (IaC)', 'AWS / Azure', 'Bash / Python Scripting'],
    entryLevelRoles: ['Cloud Support Associate', 'Junior DevOps Engineer', 'Site Reliability Trainee'],
    advancedRoles: ['Cloud Solutions Architect', 'DevOps Lead', 'VP of Cloud Infrastructure'],
    approxSalaryMinLpa: 7.0,
    approxSalaryMaxLpa: 30.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Direct Cloud Specialization',
        targetAudience: 'Engineering and Diploma students',
        description: 'Early focus on Linux sysadmin, networking, Docker containers, and cloud architecture.',
        steps: ['B.Tech or Polytechnic Diploma', 'Linux & Networking Mastery', 'Docker & Kubernetes Certification', 'Infrastructure as Code Projects', 'Cloud Consultant']
      },
      {
        routeCode: 'Route B',
        title: 'Developer to DevOps Transition',
        targetAudience: 'Software developers wanting ops expertise',
        description: 'Transitioning from writing code to automating delivery and managing infrastructure resilience.',
        steps: ['Junior Developer (1-2 years)', 'Master CI/CD & Cloud Provisioning', 'Terraform & Observability (Prometheus/Grafana)', 'DevOps Specialist']
      }
    ],
    recommendedProjects: [
      {
        title: 'Zero-Downtime Microservices CI/CD Pipeline',
        difficulty: 'Intermediate',
        description: 'Automated GitHub Actions pipeline with unit testing, Docker containerization, security scanning, and deployment to AWS EKS.',
        technologies: ['GitHub Actions', 'Docker', 'Kubernetes', 'AWS EKS', 'SonarQube']
      },
      {
        title: 'Multi-Region Infrastructure as Code with Terraform',
        difficulty: 'Advanced',
        description: 'Declarative Terraform setup for VPC, private subnets, auto-scaling groups, and load balancers with state locking.',
        technologies: ['Terraform', 'AWS VPC / EC2', 'S3', 'DynamoDB']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Cloud Infrastructure',
        title: 'AWS Certified Solutions Architect - Associate',
        provider: 'Amazon Web Services',
        level: 'Associate'
      },
      {
        category: 'Containers & Orchestration',
        title: 'Certified Kubernetes Administrator (CKA)',
        provider: 'Linux Foundation / CNCF',
        level: 'Professional'
      }
    ]
  },
  {
    id: 'c5',
    code: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security & Infrastructure',
    description: 'Protects corporate networks, clouds, and applications against malicious threats, vulnerabilities, and digital intrusions.',
    beginnerDifficulty: 'Moderate',
    preferredEducationLevels: ['Diploma', 'B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['B.Tech CSE (Cybersecurity)', 'B.Tech IT', 'BCA', 'B.Sc CS / IT', 'MCA'],
    relatedInterests: ['Cybersecurity', 'Coding', 'Networking', 'Problem Solving'],
    importantAcademicSubjects: ['Computer Networks', 'Operating Systems', 'Cryptography', 'Cyber Law & Ethics'],
    requiredSkills: ['Networking (TCP/IP)', 'Linux Security', 'Wireshark & Nmap', 'Vulnerability Assessment', 'SIEM Tools (Splunk)', 'Penetration Testing Basics'],
    entryLevelRoles: ['SOC Analyst - Tier 1', 'Junior Security Consultant', 'Penetration Tester Trainee'],
    advancedRoles: ['Chief Information Security Officer (CISO)', 'Security Architect', 'Senior Threat Hunter'],
    approxSalaryMinLpa: 6.5,
    approxSalaryMaxLpa: 26.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Network Defense to SOC Analyst',
        targetAudience: 'Engineering, Diploma & Degree graduates',
        description: 'Focus on defensive security, incident response, and log monitoring.',
        steps: ['B.Tech / BCA / Diploma', 'CompTIA Security+ Certification', 'Hands-on Labs (TryHackMe / HackTheBox)', 'SIEM Log Analysis Practice', 'SOC Analyst L1']
      },
      {
        routeCode: 'Route B',
        title: 'Offensive Security & Ethical Hacking',
        targetAudience: 'Enthusiasts with strong programming fundamentals',
        description: 'Focus on penetration testing, web application vulnerabilities (OWASP Top 10), and bug bounties.',
        steps: ['Learn Python, Bash & Web Architecture', 'Master OWASP Top 10 vulnerabilities', 'Compete in CTF (Capture The Flag)', 'Bug Bounty Program Participation', 'Penetration Tester']
      }
    ],
    recommendedProjects: [
      {
        title: 'Automated Network Vulnerability Scanner & Auditor',
        difficulty: 'Intermediate',
        description: 'Python tool scanning target network subnets, detecting open ports, outdated banners, and reporting known CVEs.',
        technologies: ['Python', 'Nmap Scripting Engine', 'Scapy', 'ReportLab']
      },
      {
        title: 'Virtual Enterprise SOC Lab & Incident Response Simulation',
        difficulty: 'Intermediate',
        description: 'Simulated home lab running Wazuh/Splunk SIEM analyzing simulated brute-force and malware attacks.',
        technologies: ['Wazuh', 'Splunk', 'Suricata IDS', 'Ubuntu Server']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Security Fundamentals',
        title: 'CompTIA Security+',
        provider: 'CompTIA',
        level: 'Foundational'
      },
      {
        category: 'Ethical Hacking',
        title: 'Certified Ethical Hacker (CEH) / eJPT',
        provider: 'EC-Council / INE Security',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c6',
    code: 'full_stack_developer',
    title: 'Full Stack Web Developer',
    category: 'Software & Cloud',
    description: 'Builds modern, responsive user interfaces and high-performance server-side APIs utilizing frameworks like React, Spring Boot, Node.js, and SQL.',
    beginnerDifficulty: 'Moderate',
    preferredEducationLevels: ['10th', 'Intermediate / 12th', 'Diploma', 'B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['B.Tech CSE', 'BCA', 'B.Sc CS', 'MCA', 'Any Degree with Web Portfolio'],
    relatedInterests: ['Web Development', 'Coding', 'Design', 'Creativity', 'Problem Solving'],
    importantAcademicSubjects: ['Computer Science', 'Web Technologies', 'Database Management'],
    requiredSkills: ['HTML5 & CSS3', 'JavaScript / TypeScript', 'React / Next.js', 'Node.js / Spring Boot', 'SQL & MongoDB', 'Git & REST APIs'],
    entryLevelRoles: ['Junior Full Stack Developer', 'Frontend Developer', 'Backend Associate'],
    advancedRoles: ['Lead Full Stack Architect', 'Engineering Lead', 'Chief Technology Officer (CTO)'],
    approxSalaryMinLpa: 5.5,
    approxSalaryMaxLpa: 22.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'College Degree + Practical Web Track',
        targetAudience: 'B.Tech, BCA, B.Sc students',
        description: 'Complement theoretical coursework with contemporary web development stacks.',
        steps: ['Learn Modern JavaScript & React', 'Master Server-Side API Architecture', 'Build 3 Full-Stack Applications', 'Publish on Vercel/Render', 'Full Stack Placement']
      }
    ],
    recommendedProjects: [
      {
        title: 'Interactive Project Management & Kanban Board',
        difficulty: 'Intermediate',
        description: 'Trello-style collaboration tool with drag-and-drop tasks, team permissions, and real-time updates.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js / Express', 'MongoDB']
      },
      {
        title: 'Multi-Vendor Marketplace with Payment Gateway',
        difficulty: 'Advanced',
        description: 'Full-fledged store with product catalogs, shopping cart, Stripe integration, and admin order management.',
        technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Stripe API']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Web Development',
        title: 'Meta Front-End Developer Professional Certificate',
        provider: 'Meta',
        level: 'Associate'
      },
      {
        category: 'Full Stack',
        title: 'IBM Full Stack Software Developer Certificate',
        provider: 'IBM',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c7',
    code: 'ui_ux_designer',
    title: 'UI / UX Designer',
    category: 'Design & Product',
    description: 'Researches user behavior, creates interactive wireframes, prototypes, and crafts accessible design systems in Figma.',
    beginnerDifficulty: 'Easy',
    preferredEducationLevels: ['10th', 'Intermediate / 12th', 'Diploma', 'B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['B.Des', 'B.Tech (Any)', 'BCA', 'BA / B.Sc Multimedia', 'Any Graduate with Design Portfolio'],
    relatedInterests: ['Design', 'Creativity', 'Communication', 'Problem Solving', 'Social Interaction'],
    importantAcademicSubjects: ['Visual Arts', 'Psychology', 'Human-Computer Interaction'],
    requiredSkills: ['Figma', 'User Research & Personas', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing', 'Information Architecture'],
    entryLevelRoles: ['Associate UI/UX Designer', 'Product Design Intern', 'Visual Designer'],
    advancedRoles: ['Principal Product Designer', 'VP of Design', 'Chief Creative Officer'],
    approxSalaryMinLpa: 5.0,
    approxSalaryMaxLpa: 22.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Self-Taught Portfolio Route',
        targetAudience: 'Any student or graduate with visual & empathy skills',
        description: 'Focus heavily on real redesign case studies rather than formal engineering degrees.',
        steps: ['Learn Figma & Typography', 'Conduct User Research Case Study', 'Design 2 Mobile App Concepts', 'Publish Behance / Notion Portfolio', 'Product Designer']
      }
    ],
    recommendedProjects: [
      {
        title: 'Civic Health App Redesign & Accessibility Case Study',
        difficulty: 'Intermediate',
        description: 'Complete end-to-end design case study redesigning a public transit or health app with elderly user accessibility testing.',
        technologies: ['Figma', 'Miro', 'User Testing', 'WCAG 2.1 Guidelines']
      },
      {
        title: 'Enterprise SaaS Design System in Figma',
        difficulty: 'Intermediate',
        description: 'Comprehensive component library with tokens, auto-layout, dark mode variants, and interactive states.',
        technologies: ['Figma Variables', 'Design Tokens', 'Storybook concepts']
      }
    ],
    recommendedCertifications: [
      {
        category: 'UX Design',
        title: 'Google UX Design Professional Certificate',
        provider: 'Google',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c8',
    code: 'embedded_iot_engineer',
    title: 'Embedded Systems & IoT Engineer',
    category: 'Core Engineering',
    description: 'Programs microcontrollers (ARM, ESP32, STM32) and firmware to bridge physical hardware with cloud networks and sensors.',
    beginnerDifficulty: 'Challenging',
    preferredEducationLevels: ['Diploma', 'B.Tech / B.E', 'Postgraduate'],
    compatibleDegrees: ['B.Tech ECE', 'B.Tech EEE', 'Diploma in Electronics', 'B.Tech Mechatronics', 'M.Tech Embedded'],
    relatedInterests: ['Electronics', 'Coding', 'Practical/Hands-on Work', 'Robotics', 'Problem Solving'],
    importantAcademicSubjects: ['Digital Electronics', 'Microprocessors & Microcontrollers', 'Signals & Systems', 'C Programming'],
    requiredSkills: ['Embedded C / C++', 'Microcontroller Architecture (ARM Cortex, ESP32)', 'Communication Protocols (UART, SPI, I2C, MQTT)', 'RTOS (FreeRTOS)', 'PCB Design Basics'],
    entryLevelRoles: ['Graduate Engineer Trainee (GET)', 'Firmware Engineer - L1', 'IoT Hardware Associate'],
    advancedRoles: ['Principal Embedded Architect', 'Director of Hardware Engineering'],
    approxSalaryMinLpa: 5.5,
    approxSalaryMaxLpa: 22.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Core Electronics to Smart Devices',
        targetAudience: 'ECE / EEE / Mechatronics students',
        description: 'Bridge physical hardware circuitry with firmware and IoT cloud dashboards.',
        steps: ['B.Tech / Diploma in ECE', 'Master Embedded C & ESP32', 'FreeRTOS Multi-tasking Projects', 'Hardware Internship (Automotive / Medical)', 'Firmware Developer']
      }
    ],
    recommendedProjects: [
      {
        title: 'Smart Agricultural IoT Telemetry Station',
        difficulty: 'Intermediate',
        description: 'Battery-operated ESP32 node measuring soil moisture, temperature, and transmitting data via MQTT with deep-sleep power management.',
        technologies: ['Embedded C', 'ESP32', 'MQTT', 'FreeRTOS', 'AWS IoT Core']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Embedded Systems',
        title: 'Arm Accredited Engineer (AAE)',
        provider: 'Arm',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c9',
    code: 'product_manager',
    title: 'Tech Product Manager',
    category: 'Design & Product',
    description: 'Defines product roadmaps, balances user requirements with business metrics, and coordinates engineering, design, and marketing teams.',
    beginnerDifficulty: 'Challenging',
    preferredEducationLevels: ['B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['B.Tech + MBA', 'BCA + MBA', 'B.Tech with Tech Experience', 'Any Graduate with Product Instinct'],
    relatedInterests: ['Leadership', 'Business', 'Problem Solving', 'Communication', 'Product Development'],
    importantAcademicSubjects: ['Business Economics', 'Software Development Life Cycle', 'Data Analytics'],
    requiredSkills: ['Product Strategy & PRDs', 'User Empathy & Research', 'Data Analysis (SQL / Mixpanel)', 'Agile & Scrum Methodologies', 'Prioritization Frameworks (RICE)'],
    entryLevelRoles: ['Associate Product Manager (APM)', 'Product Analyst', 'Junior Growth Manager'],
    advancedRoles: ['Director of Product', 'VP of Product', 'Chief Product Officer (CPO)'],
    approxSalaryMinLpa: 9.0,
    approxSalaryMaxLpa: 40.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'APM Cohort Route',
        targetAudience: 'Final year B.Tech / MBA graduates with leadership experience',
        description: 'Direct entry via competitive Associate Product Manager hiring programs.',
        steps: ['Build technical acumen & product breakdown teardowns', 'Learn SQL & Product Metrics', 'Participate in Product Competitions', 'APM Interviews']
      }
    ],
    recommendedProjects: [
      {
        title: 'End-to-End Product Requirement Document (PRD) & Metric Teardown',
        difficulty: 'Intermediate',
        description: 'Comprehensive PRD for an innovative feature on Spotify/Uber with wireframes, user stories, A/B testing strategy, and KPI definitions.',
        technologies: ['Figma', 'Notion', 'Mixpanel', 'Jira']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Product Management',
        title: 'Certified Scrum Product Owner (CSPO)',
        provider: 'Scrum Alliance',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c10',
    code: 'data_analyst',
    title: 'Data Analyst',
    category: 'Business & Analytics',
    description: 'Analyzes organizational data using SQL, Excel, and BI dashboards (Power BI / Tableau) to drive data-informed business decisions.',
    beginnerDifficulty: 'Easy',
    preferredEducationLevels: ['10th', 'Intermediate / 12th', 'Diploma', 'B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['BCA', 'B.Com', 'B.Sc Statistics / CS', 'BBA', 'B.Tech', 'Any Degree'],
    relatedInterests: ['Mathematics', 'Business', 'Data Science', 'Communication', 'Problem Solving'],
    importantAcademicSubjects: ['Statistics', 'Business Mathematics', 'English Communication'],
    requiredSkills: ['Advanced Excel & Pivot Tables', 'SQL Querying & Joins', 'Power BI / Tableau Dashboards', 'Python Basics (Pandas)', 'Business Presentation Skills'],
    entryLevelRoles: ['Junior Data Analyst', 'MIS Executive', 'Reporting Analyst'],
    advancedRoles: ['Senior Analytics Consultant', 'Lead BI Architect', 'Analytics Director'],
    approxSalaryMinLpa: 4.5,
    approxSalaryMaxLpa: 16.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Fast Track Analytics Route',
        targetAudience: 'Degree (B.Com, BBA, B.Sc) or B.Tech non-CS students',
        description: 'Master Excel, SQL, and Power BI within 3-4 months to secure commercial analytics roles.',
        steps: ['Master SQL (Joins, Window Functions)', 'Build 2 Interactive Power BI Dashboards', 'Publish Case Studies on LinkedIn/GitHub', 'Target Corporate Analyst Openings']
      }
    ],
    recommendedProjects: [
      {
        title: 'Executive Sales Performance & Customer Retention Dashboard',
        difficulty: 'Beginner',
        description: 'Interactive Power BI / Tableau dashboard with drill-down views, KPIs, customer segments, and revenue trends.',
        technologies: ['Power BI', 'SQL', 'Excel']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Business Intelligence',
        title: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
        provider: 'Microsoft',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c11',
    code: 'game_developer',
    title: 'Game Developer & Graphics Programmer',
    category: 'Software & Cloud',
    description: 'Programs real-time gameplay mechanics, physics engines, shaders, and 3D virtual worlds using Unity, Unreal Engine, and C++ / C#.',
    beginnerDifficulty: 'Challenging',
    preferredEducationLevels: ['Intermediate / 12th', 'Diploma', 'B.Tech / B.E', 'Degree'],
    compatibleDegrees: ['B.Tech CSE', 'B.Sc Game Programming / Animation', 'Diploma in Multimedia', 'BCA'],
    relatedInterests: ['Coding', 'Design', 'Creativity', 'Mathematics', 'Problem Solving'],
    importantAcademicSubjects: ['Linear Algebra', 'Trigonometry', '3D Physics', 'Computer Graphics'],
    requiredSkills: ['C# / C++', 'Unity / Unreal Engine', 'Object-Oriented Design', 'Physics & Collision Mechanics', 'Shaders & 3D Math'],
    entryLevelRoles: ['Junior Gameplay Programmer', 'Game Scripting Intern'],
    advancedRoles: ['Lead Game Architect', 'Technical Director', 'Studio Head'],
    approxSalaryMinLpa: 5.0,
    approxSalaryMaxLpa: 24.0,
    salaryReferenceSource: 'India Tech Industry Survey 2024 (Approximate Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Indie to Studio Route',
        targetAudience: 'Passionate game programmers',
        description: 'Release complete indie games on itch.io or Google Play to prove technical competency.',
        steps: ['Master C# & Unity Basics', 'Build 3 Complete Micro-Games (2D & 3D)', 'Publish on Itch.io', 'Participate in Global Game Jams', 'Junior Studio Programmer']
      }
    ],
    recommendedProjects: [
      {
        title: '3D Action-Adventure Prototype with Custom AI Enemies',
        difficulty: 'Intermediate',
        description: 'Playable 3D prototype with state machine enemy AI, physics-based grappling hook, and particle effects.',
        technologies: ['Unity', 'C#', 'Blender basics']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Game Engine',
        title: 'Unity Certified Associate: Game Developer',
        provider: 'Unity Technologies',
        level: 'Associate'
      }
    ]
  },
  {
    id: 'c12',
    code: 'civil_services_officer',
    title: 'Civil Services & Public Administration',
    category: 'Civil & Public Services',
    description: 'Executes public policy, coordinates governance programs, and serves communities through competitive civil examinations (UPSC / State PSC).',
    beginnerDifficulty: 'Advanced',
    preferredEducationLevels: ['10th', 'Intermediate / 12th', 'B.Tech / B.E', 'Degree', 'Postgraduate'],
    compatibleDegrees: ['Any Recognized Bachelor Degree (B.Tech, BA, B.Sc, B.Com, MBBS)'],
    relatedInterests: ['Government Career', 'Helping People', 'Leadership', 'Job Security', 'Social Interaction'],
    importantAcademicSubjects: ['Indian Polity', 'History & Culture', 'Geography', 'General Studies', 'Ethics'],
    requiredSkills: ['Analytical Writing', 'Current Affairs Comprehension', 'Public Policy Understanding', 'Ethical Decision Making', 'Leadership & Communication'],
    entryLevelRoles: ['Sub-Divisional Magistrate (SDM)', 'Assistant Commissioner', 'Probationary Officer (IAS/IPS/IRS/State PSC)'],
    advancedRoles: ['District Magistrate', 'Department Secretary', 'Chief Secretary'],
    approxSalaryMinLpa: 7.0,
    approxSalaryMaxLpa: 18.0,
    salaryReferenceSource: 'Government of India Pay Commission Scale (Reference)',
    alternativeRoutes: [
      {
        routeCode: 'Route A',
        title: 'Degree Graduation + Civil Prep Track',
        targetAudience: 'Any 12th pass or college student targeting public service',
        description: 'Complete any graduation degree with parallel comprehensive General Studies preparation.',
        steps: ['Complete 3-4 Year Bachelor Degree', 'Systematic NCERT & Standard Text Reading', 'Daily Current Affairs Analysis', 'Answer Writing Practice', 'UPSC / State PSC Exam']
      }
    ],
    recommendedProjects: [
      {
        title: 'Community Development Initiative & Policy Analysis Report',
        difficulty: 'Beginner',
        description: 'Field research report analyzing local governance schemes (PDS, rural health, or digital literacy) with proposed administrative solutions.',
        technologies: ['Field Interviews', 'Data Synthesis', 'Public Policy Research']
      }
    ],
    recommendedCertifications: [
      {
        category: 'Public Administration',
        title: 'Public Policy Analysis Certification',
        provider: 'NPTEL / Harvard Online / Swayam',
        level: 'Foundational'
      }
    ]
  }
];
