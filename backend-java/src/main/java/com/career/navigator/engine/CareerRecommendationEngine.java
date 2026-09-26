package com.career.navigator.engine;

import com.career.navigator.model.Career;
import com.career.navigator.model.EducationLevel;
import com.career.navigator.model.StudentProfile;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Primary Career Recommendation Engine implemented in pure Java.
 * Uses a transparent, multi-factor weighted scoring algorithm:
 * - Interest Match: 30%
 * - Education Compatibility: 20%
 * - Skill Match: 20%
 * - Goal Match: 10%
 * - Academic Subject Match: 10%
 * - Projects & Certifications: 10%
 * Total = 100%
 *
 * It does NOT rely on black-box heuristics or external LLMs for scoring.
 */
@Component
public class CareerRecommendationEngine {

    public static class MatchBreakdown {
        private final double interestScore;      // out of 30
        private final double educationScore;     // out of 20
        private final double skillScore;         // out of 20
        private final double goalScore;          // out of 10
        private final double academicScore;      // out of 10
        private final double experienceScore;    // out of 10
        private final int totalProfileMatchScore; // 0 to 100
        private final List<String> matchHighlights;
        private final List<String> missingSkills;

        public MatchBreakdown(double interestScore, double educationScore, double skillScore,
                              double goalScore, double academicScore, double experienceScore,
                              List<String> matchHighlights, List<String> missingSkills) {
            this.interestScore = Math.round(interestScore * 10.0) / 10.0;
            this.educationScore = Math.round(educationScore * 10.0) / 10.0;
            this.skillScore = Math.round(skillScore * 10.0) / 10.0;
            this.goalScore = Math.round(goalScore * 10.0) / 10.0;
            this.academicScore = Math.round(academicScore * 10.0) / 10.0;
            this.experienceScore = Math.round(experienceScore * 10.0) / 10.0;
            int total = (int) Math.round(interestScore + educationScore + skillScore + goalScore + academicScore + experienceScore);
            this.totalProfileMatchScore = Math.min(99, Math.max(10, total));
            this.matchHighlights = matchHighlights;
            this.missingSkills = missingSkills;
        }

        public double getInterestScore() { return interestScore; }
        public double getEducationScore() { return educationScore; }
        public double getSkillScore() { return skillScore; }
        public double getGoalScore() { return goalScore; }
        public double getAcademicScore() { return academicScore; }
        public double getExperienceScore() { return experienceScore; }
        public int getTotalProfileMatchScore() { return totalProfileMatchScore; }
        public List<String> getMatchHighlights() { return matchHighlights; }
        public List<String> getMissingSkills() { return missingSkills; }
    }

    public static class ScoredCareer {
        private final Career career;
        private final MatchBreakdown breakdown;

        public ScoredCareer(Career career, MatchBreakdown breakdown) {
            this.career = career;
            this.breakdown = breakdown;
        }

        public Career getCareer() { return career; }
        public MatchBreakdown getBreakdown() { return breakdown; }
        public int getScore() { return breakdown.getTotalProfileMatchScore(); }
    }

    /**
     * Evaluates a candidate career against a student's profile.
     */
    public ScoredCareer evaluateCareer(StudentProfile profile, Career career) {
        List<String> highlights = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        // 1. Interest Match (Weight: 30%)
        double interestScore = calculateInterestScore(profile, career, highlights);

        // 2. Education Compatibility (Weight: 20%)
        double educationScore = calculateEducationScore(profile, career, highlights);

        // 3. Skill Match (Weight: 20%)
        double skillScore = calculateSkillScore(profile, career, highlights, missingSkills);

        // 4. Goal Match (Weight: 10%)
        double goalScore = calculateGoalScore(profile, career, highlights);

        // 5. Academic Subjects Performance & Alignment (Weight: 10%)
        double academicScore = calculateAcademicScore(profile, career, highlights);

        // 6. Projects & Certifications (Weight: 10%)
        double experienceScore = calculateExperienceScore(profile, career, highlights);

        MatchBreakdown breakdown = new MatchBreakdown(
                interestScore, educationScore, skillScore,
                goalScore, academicScore, experienceScore,
                highlights, missingSkills
        );

        return new ScoredCareer(career, breakdown);
    }

    /**
     * Ranks all careers and returns the top matches (default top 5).
     */
    public List<ScoredCareer> rankCareers(StudentProfile profile, List<Career> allCareers) {
        return allCareers.stream()
                .map(career -> evaluateCareer(profile, career))
                .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
                .collect(Collectors.toList());
    }

    private double calculateInterestScore(StudentProfile profile, Career career, List<String> highlights) {
        if (profile.getInterests() == null || profile.getInterests().isEmpty()) {
            return 15.0; // neutral fallback
        }
        Set<String> careerInterests = career.getRelatedInterests().stream()
                .map(String::toLowerCase).collect(Collectors.toSet());

        long matchingCount = profile.getInterests().stream()
                .filter(userInterest -> careerInterests.stream()
                        .anyMatch(ci -> ci.contains(userInterest.toLowerCase()) || userInterest.toLowerCase().contains(ci)))
                .count();

        double ratio = Math.min(1.0, (double) matchingCount / Math.max(1, Math.min(3, careerInterests.size())));
        double score = ratio * 30.0;
        if (matchingCount > 0) {
            highlights.add("High interest alignment with " + matchingCount + " key domains in " + career.getTitle());
        }
        return score;
    }

    private double calculateEducationScore(StudentProfile profile, Career career, List<String> highlights) {
        EducationLevel edu = profile.getEducationLevel();
        if (edu == null) return 10.0;

        // School stage: 10th and 12th are prospective pathways
        if (edu == EducationLevel.TENTH) {
            // For 10th, look at stream suitability
            if ("Software & Cloud".equalsIgnoreCase(career.getCategory()) || "AI & Data".equalsIgnoreCase(career.getCategory())) {
                highlights.add("Directly accessible via MPC / Science streams in Intermediate or Diploma in CSE");
                return 19.0;
            } else if ("Healthcare & Life Sciences".equalsIgnoreCase(career.getCategory())) {
                highlights.add("Accessible via BiPC stream in Intermediate leading to Medical/Bio degrees");
                return 18.5;
            } else if ("Civil & Public Services".equalsIgnoreCase(career.getCategory())) {
                highlights.add("Broad eligibility across all streams (MEC, CEC, HEC, MPC)");
                return 18.0;
            }
            return 16.0;
        }

        if (edu == EducationLevel.INTERMEDIATE_12TH) {
            String stream = profile.getStream() != null ? profile.getStream().toUpperCase() : "";
            if (stream.contains("MPC")) {
                if ("Software & Cloud".equalsIgnoreCase(career.getCategory()) || "AI & Data".equalsIgnoreCase(career.getCategory()) || "Core Engineering".equalsIgnoreCase(career.getCategory())) {
                    highlights.add("MPC stream provides foundational math & physics for B.Tech/BCA pathways");
                    return 20.0;
                }
            } else if (stream.contains("BIPC")) {
                if ("Healthcare & Life Sciences".equalsIgnoreCase(career.getCategory()) || "Biotechnology".equalsIgnoreCase(career.getTitle())) {
                    highlights.add("BiPC stream matches healthcare, pharmacy, and bio-informatics degrees");
                    return 20.0;
                }
            } else if (stream.contains("MEC") || stream.contains("CEC")) {
                if ("Business & Analytics".equalsIgnoreCase(career.getCategory()) || "Financial Analyst".equalsIgnoreCase(career.getTitle())) {
                    highlights.add("Commerce & Economics stream aligns with B.Com/BBA/CA/Data Analytics paths");
                    return 20.0;
                }
            }
            return 14.0;
        }

        // College stage: check compatible degrees or branches
        String userDegree = profile.getBranch() != null ? profile.getBranch().toUpperCase() : "";
        if (profile.getDegreeSpecialization() != null) {
            userDegree += " " + profile.getDegreeSpecialization().toUpperCase();
        }

        final String target = userDegree;
        boolean matchesDegree = career.getCompatibleDegrees().stream()
                .anyMatch(deg -> target.contains(deg.toUpperCase()) || deg.toUpperCase().contains(target));

        if (matchesDegree) {
            highlights.add("Degree/Branch (" + userDegree + ") is directly targeted by industry recruiters");
            return 20.0;
        }
        return 14.0;
    }

    private double calculateSkillScore(StudentProfile profile, Career career, List<String> highlights, List<String> missingSkills) {
        // School students (10th/12th) do not have professional skills yet
        if (profile.getEducationLevel() == EducationLevel.TENTH || profile.getEducationLevel() == EducationLevel.INTERMEDIATE_12TH) {
            // Evaluated gently based on academic inclination rather than penalizing missing Git/Docker
            return 17.0; // Scaled base score so high schoolers are not penalized
        }

        Set<String> userSkills = profile.getTechnicalSkills() != null ?
                profile.getTechnicalSkills().stream().map(String::toLowerCase).collect(Collectors.toSet()) : Collections.emptySet();

        Set<String> required = career.getRequiredSkills() != null ? career.getRequiredSkills() : Collections.emptySet();

        if (required.isEmpty()) return 16.0;

        int matchedCount = 0;
        for (String req : required) {
            boolean has = userSkills.stream().anyMatch(us -> us.contains(req.toLowerCase()) || req.toLowerCase().contains(us));
            if (has) {
                matchedCount++;
            } else {
                missingSkills.add(req);
            }
        }

        double ratio = (double) matchedCount / required.size();
        double score = ratio * 20.0;
        if (matchedCount > 0) {
            highlights.add("Possesses " + matchedCount + " of " + required.size() + " industry-standard required skills");
        }
        return score;
    }

    private double calculateGoalScore(StudentProfile profile, Career career, List<String> highlights) {
        if (profile.getCareerGoals() == null || profile.getCareerGoals().isEmpty()) return 7.0;

        Set<String> goals = profile.getCareerGoals().stream().map(String::toLowerCase).collect(Collectors.toSet());
        double score = 5.0;

        if (goals.contains("high salary") || goals.contains("high compensation")) {
            if (career.getApproxSalaryMaxLpa() != null && career.getApproxSalaryMaxLpa() >= 18.0) {
                score += 3.0;
                highlights.add("Strong long-term compensation ceiling (up to ₹" + career.getApproxSalaryMaxLpa() + " LPA)");
            }
        }
        if (goals.contains("research") || goals.contains("deep tech")) {
            if ("AI & Data".equalsIgnoreCase(career.getCategory()) || career.getTitle().contains("Scientist") || career.getTitle().contains("Researcher")) {
                score += 3.0;
            }
        }
        if (goals.contains("remote work") || goals.contains("work abroad")) {
            if ("Software & Cloud".equalsIgnoreCase(career.getCategory()) || "AI & Data".equalsIgnoreCase(career.getCategory()) || "Design & Product".equalsIgnoreCase(career.getCategory())) {
                score += 2.5;
            }
        }
        if (goals.contains("government career") || goals.contains("job security")) {
            if ("Civil & Public Services".equalsIgnoreCase(career.getCategory()) || "Core Engineering".equalsIgnoreCase(career.getCategory())) {
                score += 3.0;
                highlights.add("Offers robust public-sector, PSU, or civil service pathways");
            }
        }
        return Math.min(10.0, score);
    }

    private double calculateAcademicScore(StudentProfile profile, Career career, List<String> highlights) {
        double score = 6.0;
        String math = profile.getMathPerformance();
        String science = profile.getSciencePerformance();

        if ("Strong".equalsIgnoreCase(math) || "Excellent".equalsIgnoreCase(math)) {
            if (career.getImportantSubjects().stream().anyMatch(s -> s.toLowerCase().contains("math") || s.toLowerCase().contains("calculus") || s.toLowerCase().contains("statistics"))) {
                score += 3.0;
                highlights.add("Strong mathematical foundation matches technical requirements");
            }
        }
        if ("Strong".equalsIgnoreCase(science) || "Excellent".equalsIgnoreCase(science)) {
            if (career.getImportantSubjects().stream().anyMatch(s -> s.toLowerCase().contains("physics") || s.toLowerCase().contains("science") || s.toLowerCase().contains("biology"))) {
                score += 2.0;
            }
        }
        return Math.min(10.0, score);
    }

    private double calculateExperienceScore(StudentProfile profile, Career career, List<String> highlights) {
        if (profile.getEducationLevel() == EducationLevel.TENTH || profile.getEducationLevel() == EducationLevel.INTERMEDIATE_12TH) {
            return 8.0; // Baseline for high-school
        }
        int projects = profile.getProjectCount() != null ? profile.getProjectCount() : 0;
        int certs = profile.getCertificationCount() != null ? profile.getCertificationCount() : 0;

        double score = Math.min(6.0, projects * 2.0) + Math.min(4.0, certs * 2.0);
        if (projects > 0) {
            highlights.add(projects + " relevant project(s) demonstrated in portfolio");
        }
        return Math.min(10.0, score);
    }
}
