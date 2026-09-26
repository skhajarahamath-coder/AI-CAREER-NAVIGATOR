# AI Career Navigator - Spring Boot 3 & Java 21 Backend

## 1. Architectural Overview
The **AI Career Navigator** backend is architected around pure Java 21, Spring Boot 3.3.x, Spring Data JPA, and MySQL.

```
Client (Web UI / Mobile)
        │
        ▼
Spring MVC Controllers (REST APIs)
        │
        ▼
Spring Service Layer
  ├── CareerService
  ├── RecommendationService
  └── GeminiAiService (Natural language explanations & chatbot)
        │
        ▼
Java Core Matching Engines
  ├── CareerRecommendationEngine (Pure Java Weighted Multi-Factor Algorithm)
  ├── RoadmapGeneratorEngine (Stage-by-stage adaptive milestones)
  └── SkillGapAnalyzer (Readiness scoring & sequenced learning order)
        │
        ▼
Spring Data JPA Repositories
        │
        ▼
MySQL Database (Relational Schema & Seed Data)
```

## 2. Directory Structure
```
backend-java/
├── pom.xml                               # Maven Project Descriptor with Java 21 & Spring Boot 3
├── README.md                             # Architecture & Execution Guide
└── src/
    └── main/
        ├── java/com/career/navigator/
        │   ├── AiCareerNavigatorApplication.java
        │   ├── config/                   # WebMvc CORS, WeightConfig
        │   ├── controller/               # REST Endpoints (/api/careers, /api/recommendations)
        │   ├── dto/                      # Transfer Objects
        │   ├── engine/                   # Java-based Weighted Scoring & Roadmap Engines
        │   │   ├── CareerRecommendationEngine.java
        │   │   ├── RoadmapGeneratorEngine.java
        │   │   └── SkillGapAnalyzer.java
        │   ├── model/                    # JPA Entities & Enums
        │   │   ├── EducationLevel.java
        │   │   ├── StudentProfile.java
        │   │   └── Career.java
        │   ├── repository/               # Spring Data JPA Repositories
        │   └── service/                  # Business Services & Gemini Client
        └── resources/
            ├── application.yml           # Database & AI Configuration
            ├── schema.sql                # Complete Relational Table Definitions
            └── data.sql                  # 20+ Extensible Career Profiles & Seeds
```

## 3. Java Recommendation Engine Algorithm
The primary career matching algorithm is deterministic, transparent, and implemented in Java without delegating scoring to external AI:

| Factor | Weight | Evaluation Logic |
|---|---|---|
| **Interest Match** | **30%** | Compares student's chosen interests with career's core domains |
| **Education Compatibility** | **20%** | Evaluates current education tier (10th/12th/Diploma/B.Tech/Degree/PG) against career eligibility |
| **Skill Match** | **20%** | Compares student's technical skills against industry-standard requirements (High school students are not penalized) |
| **Goal Match** | **10%** | Aligns salary expectations, research ambition, work-from-home, or public service preferences |
| **Academic Performance** | **10%** | Evaluates Math, Science, and English performance against subject dependencies |
| **Projects & Certifications** | **10%** | Evaluates student portfolio depth and validated credentials |

**Total Profile Match Score = Sum of Factor Scores (0% to 100%)**
Label: `"Profile Match Score: XX%"`

## 4. Running the Spring Boot Application
### Prerequisites
- JDK 21 installed (`java -version`)
- Maven 3.9+ installed (`mvn -version`)
- MySQL 8.0+ running on port 3306 (or rely on default in-memory H2 profile)

### Commands
```bash
cd backend-java

# Build the project
mvn clean package -DskipTests

# Run the Spring Boot application
mvn spring-boot:run
```

The server will initialize at `http://localhost:8080`.
The REST endpoints will be exposed at:
- `GET  /api/careers`
- `GET  /api/careers/{id}`
- `POST /api/recommendations/evaluate`
- `POST /api/recommendations/roadmap/{careerId}`
- `POST /api/recommendations/skill-gap/{careerId}`

## 5. Gemini API Configuration
The application gracefully runs without Gemini for all core career recommendations, roadmaps, and comparisons.
To enable AI explanations, career chatbot, and resume enhancement, set the environment variable:
```bash
export GEMINI_API_KEY="your_actual_key_here"
```
Or define it in your `application.yml` or `.env`.
