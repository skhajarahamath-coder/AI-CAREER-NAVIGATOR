-- ================================================================
-- AI CAREER NAVIGATOR - RELATIONAL DATABASE SCHEMA (MySQL 8.x)
-- ================================================================

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    education_level VARCHAR(50) NOT NULL, -- TENTH, INTERMEDIATE_12TH, DIPLOMA, BTECH_BE, DEGREE, POSTGRADUATE
    stream VARCHAR(100),
    branch VARCHAR(100),
    current_year VARCHAR(20),
    cgpa_percentage DECIMAL(5, 2),
    backlogs INT DEFAULT 0,
    academic_performance VARCHAR(50), -- Excellent, Good, Average
    math_performance VARCHAR(50),
    science_performance VARCHAR(50),
    english_performance VARCHAR(50),
    favorite_subjects TEXT,
    interests TEXT,
    personality_traits TEXT,
    career_goals TEXT,
    work_environment_pref VARCHAR(100),
    higher_ed_pref VARCHAR(100),
    study_abroad_interest BOOLEAN DEFAULT FALSE,
    govt_private_pref VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL, -- PROGRAMMING, FRAMEWORK, DATABASE, CLOUD, AI_ML, CYBERSECURITY, DEVOPS, CORE_ACADEMIC, SOFT_SKILL
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS student_skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    profile_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    proficiency_level VARCHAR(20) DEFAULT 'INTERMEDIATE', -- BEGINNER, INTERMEDIATE, ADVANCED
    FOREIGN KEY (profile_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE KEY uq_profile_skill (profile_id, skill_id)
);

CREATE TABLE IF NOT EXISTS student_projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    profile_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    technologies_used VARCHAR(255),
    difficulty_level VARCHAR(20), -- BEGINNER, INTERMEDIATE, ADVANCED
    is_team_project BOOLEAN DEFAULT FALSE,
    github_url VARCHAR(255),
    FOREIGN KEY (profile_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student_certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    profile_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    issuing_organization VARCHAR(150),
    issue_year INT,
    category VARCHAR(50),
    FOREIGN KEY (profile_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS careers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    career_code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    beginner_difficulty VARCHAR(20) NOT NULL, -- EASY, MODERATE, HIGH
    preferred_education_levels TEXT NOT NULL,
    compatible_degrees TEXT NOT NULL,
    related_interests TEXT NOT NULL,
    important_academic_subjects TEXT NOT NULL,
    entry_level_roles TEXT NOT NULL,
    advanced_roles TEXT NOT NULL,
    approx_salary_min_lpa DECIMAL(5, 1),
    approx_salary_max_lpa DECIMAL(5, 1),
    salary_reference_source VARCHAR(100) DEFAULT 'India Tech Industry Survey 2024 (Approximate Reference)',
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS career_required_skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    career_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    is_mandatory BOOLEAN DEFAULT TRUE,
    importance_weight INT DEFAULT 1,
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS career_routes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    career_id BIGINT NOT NULL,
    route_code VARCHAR(20) NOT NULL, -- Route A, Route B, Route C
    route_title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    target_audience VARCHAR(100),
    step_sequence TEXT NOT NULL,
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS roadmaps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    career_id BIGINT NOT NULL,
    education_level VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    total_estimated_months INT,
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS roadmap_steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    roadmap_id BIGINT NOT NULL,
    stage_number INT NOT NULL,
    stage_title VARCHAR(150) NOT NULL,
    learning_topics TEXT NOT NULL,
    recommended_projects TEXT,
    suggested_resources TEXT,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    profile_id BIGINT NOT NULL,
    career_id BIGINT NOT NULL,
    match_percentage INT NOT NULL,
    interest_score DECIMAL(5, 2) NOT NULL,
    education_score DECIMAL(5, 2) NOT NULL,
    skill_score DECIMAL(5, 2) NOT NULL,
    goal_score DECIMAL(5, 2) NOT NULL,
    academic_score DECIMAL(5, 2) NOT NULL,
    experience_score DECIMAL(5, 2) NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE
);
