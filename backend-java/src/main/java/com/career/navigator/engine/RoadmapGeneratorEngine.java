package com.career.navigator.engine;

import com.career.navigator.model.Career;
import com.career.navigator.model.EducationLevel;
import com.career.navigator.model.StudentProfile;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Generates personalized, milestone-driven roadmaps tailored
 * to the student's current education tier and existing capabilities.
 */
@Component
public class RoadmapGeneratorEngine {

    public static class RoadmapStage {
        private final int stageNumber;
        private final String stageName;
        private final String duration;
        private final String focus;
        private final List<String> topics;
        private final List<String> actionItems;

        public RoadmapStage(int stageNumber, String stageName, String duration, String focus, List<String> topics, List<String> actionItems) {
            this.stageNumber = stageNumber;
            this.stageName = stageName;
            this.duration = duration;
            this.focus = focus;
            this.topics = topics;
            this.actionItems = actionItems;
        }

        public int getStageNumber() { return stageNumber; }
        public String getStageName() { return stageName; }
        public String getDuration() { return duration; }
        public String getFocus() { return focus; }
        public List<String> getTopics() { return topics; }
        public List<String> getActionItems() { return actionItems; }
    }

    public static class GeneratedRoadmap {
        private final String careerTitle;
        private final EducationLevel startingPoint;
        private final String targetRole;
        private final List<RoadmapStage> stages;
        private final List<String> alternativeRoutes;

        public GeneratedRoadmap(String careerTitle, EducationLevel startingPoint, String targetRole, List<RoadmapStage> stages, List<String> alternativeRoutes) {
            this.careerTitle = careerTitle;
            this.startingPoint = startingPoint;
            this.targetRole = targetRole;
            this.stages = stages;
            this.alternativeRoutes = alternativeRoutes;
        }

        public String getCareerTitle() { return careerTitle; }
        public EducationLevel getStartingPoint() { return startingPoint; }
        public String getTargetRole() { return targetRole; }
        public List<RoadmapStage> getStages() { return stages; }
        public List<String> getAlternativeRoutes() { return alternativeRoutes; }
    }

    public GeneratedRoadmap generatePersonalizedRoadmap(StudentProfile profile, Career career) {
        EducationLevel level = profile.getEducationLevel() != null ? profile.getEducationLevel() : EducationLevel.TENTH;
        List<RoadmapStage> stages = new ArrayList<>();
        List<String> routes = new ArrayList<>();

        switch (level) {
            case TENTH -> {
                stages.add(new RoadmapStage(1, "Senior Secondary Stream Selection", "2 Years",
                        "Choose MPC (Maths, Physics, Chemistry) or 3-year Polytechnic Diploma in CSE",
                        List.of("Strong foundation in Mathematics (Algebra, Calculus)", "Physics fundamentals", "Basic computational thinking"),
                        List.of("Enroll in 11th MPC or Polytechnic Diploma", "Participate in science fairs & Olympiads")));
                stages.add(new RoadmapStage(2, "Undergraduate Admissions & Degree", "3 - 4 Years",
                        "Target B.Tech CSE / AI / IT or BCA via state / national entrance exams",
                        List.of("Engineering entrance prep (JEE / State EAMCET)", "Core Computer Science subjects", "Algorithms & Object Oriented Programming"),
                        List.of("Maintain > 75% in 12th standard", "Secure admission in accredited college")));
                stages.add(new RoadmapStage(3, "Core Technical & Project Building", "Year 2-3 of College",
                        "Master programming language (Java / Python), Git, and Data Structures",
                        List.of("Object-Oriented Programming (Java)", "Relational Databases & SQL", "Web fundamentals / API development"),
                        List.of("Build 2 end-to-end projects", "Create active GitHub profile")));
                stages.add(new RoadmapStage(4, "Internships & Career Transition", "Final Year",
                        "Practical industry exposure and campus placement preparation",
                        List.of("System design fundamentals", "Mock interviews & DSA practice", "Resume crafting"),
                        List.of("Apply for 3-6 month internships", "Target entry-level " + (career.getEntryLevelRoles().isEmpty() ? "Associate Engineer" : career.getEntryLevelRoles().get(0)))));
            }

            case INTERMEDIATE_12TH -> {
                stages.add(new RoadmapStage(1, "Degree Entrance & First Year Onboarding", "Year 1",
                        "Secure admission into targeted degree (B.Tech / BCA / B.Sc) and master fundamentals",
                        List.of("C / C++ or Java programming", "Discrete Mathematics", "Problem solving & logic"),
                        List.of("Complete 50 coding problems on LeetCode/HackerRank", "Set up development environment (VS Code / IntelliJ)")));
                stages.add(new RoadmapStage(2, "Domain Specialization & Frameworks", "Year 2",
                        "Deep dive into " + career.getTitle() + " stack and libraries",
                        new ArrayList<>(career.getRequiredSkills()),
                        List.of("Build CRUD applications", "Understand REST APIs and Git version control")));
                stages.add(new RoadmapStage(3, "Portfolio Projects & Open Source", "Year 3",
                        "Architect full-stack or specialized solutions solving real problems",
                        List.of("Microservices / Cloud deployment", "Database indexing & optimization", "Security best practices"),
                        List.of("Publish 2 production-ready projects on GitHub", "Participate in 2 hackathons")));
                stages.add(new RoadmapStage(4, "Campus Placements & Industry Entry", "Year 4",
                        "Interview preparation and company-specific testing",
                        List.of("Data Structures & Algorithms", "Behavioral questions", "Resume polishing"),
                        List.of("Clear campus selection rounds", "Join as " + (career.getEntryLevelRoles().isEmpty() ? "Associate" : career.getEntryLevelRoles().get(0)))));
            }

            case DIPLOMA -> {
                stages.add(new RoadmapStage(1, "Lateral Entry B.Tech or Direct Job Preparation", "Year 1",
                        "Crack ECET for 2nd-year B.Tech lateral entry OR upskill for junior developer roles",
                        List.of("Advanced Engineering Mathematics", "Core Java / Python OOP", "Data Structures basics"),
                        List.of("Take state lateral entry exam", "Earn 1 foundational industry certification")));
                stages.add(new RoadmapStage(2, "Advanced Engineering & Project Acceleration", "Year 2",
                        "Bridge academic gap and create robust applied projects",
                        new ArrayList<>(career.getRequiredSkills()),
                        List.of("Collaborate on team capstone project", "Build portfolio site")));
                stages.add(new RoadmapStage(3, "Industry Transition", "Final Year",
                        "Target product companies and IT services",
                        List.of("Interview DSA drills", "System architecture", "Communication skills"),
                        List.of("Apply via off-campus drives and campus placement")));
            }

            case BTECH_BE, DEGREE -> {
                stages.add(new RoadmapStage(1, "Skill Gap Closing & Modern Frameworks", "Months 1 - 3",
                        "Address missing required skills for " + career.getTitle(),
                        new ArrayList<>(career.getRequiredSkills()),
                        List.of("Complete hands-on tutorials", "Implement 3 mini projects targeting each missing skill")));
                stages.add(new RoadmapStage(2, "Full-scale Capstone Project", "Months 4 - 6",
                        "Develop a deployable, enterprise-standard project with documentation",
                        List.of("Architecture design", "Testing (Unit & Integration)", "CI/CD & Cloud Hosting"),
                        List.of("Deploy live demo on AWS/Vercel", "Write detailed README and architecture diagram")));
                stages.add(new RoadmapStage(3, "Internship & Production Experience", "Months 7 - 9",
                        "Secure industry internship or open-source fellowship",
                        List.of("Agile workflows", "Code reviews", "Performance profiling"),
                        List.of("Contribute to open source", "Complete 2-4 month internship")));
                stages.add(new RoadmapStage(4, "Full-Time Placement & Career Launch", "Months 10 - 12",
                        "Target competitive hiring rounds",
                        List.of("Advanced System Design", "Company-specific DSA questions", "HR & Behavioral preparation"),
                        List.of("Apply to 20+ targeted companies", "Target role: " + (career.getEntryLevelRoles().isEmpty() ? "Junior Engineer" : career.getEntryLevelRoles().get(0)))));
            }

            case POSTGRADUATE -> {
                stages.add(new RoadmapStage(1, "Advanced Specialization & Research", "Months 1 - 4",
                        "Master cutting-edge subfields and specialized tooling",
                        new ArrayList<>(career.getRequiredSkills()),
                        List.of("Publish research paper or technical whitepaper", "Implement state-of-the-art benchmarks")));
                stages.add(new RoadmapStage(2, "Enterprise Systems & Lead Projects", "Months 5 - 8",
                        "Architect high-throughput, distributed, or production-grade ML pipelines",
                        List.of("Distributed systems", "Scalability & low-latency design", "Cost optimization"),
                        List.of("Release production-grade open-source package", "Conduct technical workshops")));
                stages.add(new RoadmapStage(3, "Senior / Lead Placement", "Months 9 - 12",
                        "Target mid-level / senior specialist roles",
                        career.getAdvancedRoles(),
                        List.of("Interview for Senior / Specialist designations", "Negotiate competitive compensation")));
            }
        }

        // Add 3 distinct routes
        routes.add("Route A (Traditional Tech Route): B.Tech CSE -> DSA & Spring Boot/React -> Project Portfolio -> Campus Placements");
        routes.add("Route B (Alternative Computer Applications): BCA -> MCA / M.Sc -> Practical Internship -> Full-Stack Specialist");
        routes.add("Route C (Diploma / Self-Taught Route): Polytechnic Diploma -> Lateral Entry B.Tech OR Bootcamps -> Open Source -> Job");

        return new GeneratedRoadmap(career.getTitle(), level,
                career.getEntryLevelRoles().isEmpty() ? career.getTitle() : career.getEntryLevelRoles().get(0),
                stages, routes);
    }
}
