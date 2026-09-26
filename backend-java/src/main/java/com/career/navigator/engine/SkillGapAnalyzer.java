package com.career.navigator.engine;

import com.career.navigator.model.Career;
import com.career.navigator.model.EducationLevel;
import com.career.navigator.model.StudentProfile;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Performs skill gap analysis between student's profile and targeted career.
 * Formats findings respectfully based on the user's educational stage.
 */
@Component
public class SkillGapAnalyzer {

    public static class SkillGapReport {
        private final boolean isSchoolStudent;
        private final List<String> currentPossessedSkills;
        private final List<String> readyOrPossessedSkills;
        private final List<String> missingSkillsToLearn;
        private final List<String> skillsToDevelopLater;
        private final List<String> suggestedLearningSequence;
        private final int readinessPercentage;

        public SkillGapReport(boolean isSchoolStudent, List<String> currentPossessedSkills,
                              List<String> readyOrPossessedSkills, List<String> missingSkillsToLearn,
                              List<String> skillsToDevelopLater, List<String> suggestedLearningSequence,
                              int readinessPercentage) {
            this.isSchoolStudent = isSchoolStudent;
            this.currentPossessedSkills = currentPossessedSkills;
            this.readyOrPossessedSkills = readyOrPossessedSkills;
            this.missingSkillsToLearn = missingSkillsToLearn;
            this.skillsToDevelopLater = skillsToDevelopLater;
            this.suggestedLearningSequence = suggestedLearningSequence;
            this.readinessPercentage = readinessPercentage;
        }

        public boolean isSchoolStudent() { return isSchoolStudent; }
        public List<String> getCurrentPossessedSkills() { return currentPossessedSkills; }
        public List<String> getReadyOrPossessedSkills() { return readyOrPossessedSkills; }
        public List<String> getMissingSkillsToLearn() { return missingSkillsToLearn; }
        public List<String> getSkillsToDevelopLater() { return skillsToDevelopLater; }
        public List<String> getSuggestedLearningSequence() { return suggestedLearningSequence; }
        public int getReadinessPercentage() { return readinessPercentage; }
    }

    public SkillGapReport analyze(StudentProfile profile, Career career) {
        EducationLevel level = profile.getEducationLevel() != null ? profile.getEducationLevel() : EducationLevel.TENTH;

        if (level == EducationLevel.TENTH || level == EducationLevel.INTERMEDIATE_12TH) {
            // For school students: do not expect professional tools.
            // Show foundational skills to cultivate over the next few years.
            List<String> foundational = List.of(
                    "Computational Thinking & Basic Logic",
                    "Introductory Programming (Python or Scratch/Java)",
                    "Applied Mathematics & Statistics",
                    "English & Written Technical Communication",
                    "Problem Solving & Analytical Reasoning"
            );

            List<String> laterSkills = new ArrayList<>(career.getRequiredSkills());

            return new SkillGapReport(
                    true,
                    new ArrayList<>(profile.getFavoriteSubjects()),
                    List.of("Strong Curiosity", "Analytical Aptitude", "Foundational Math/Science"),
                    Collections.emptyList(),
                    laterSkills,
                    foundational,
                    80 // High readiness for learning
            );
        }

        // For college students & graduates
        Set<String> userSkills = profile.getTechnicalSkills() != null ?
                profile.getTechnicalSkills().stream().map(String::trim).collect(Collectors.toSet()) : Collections.emptySet();

        List<String> matched = new ArrayList<>();
        List<String> missing = new ArrayList<>();

        for (String req : career.getRequiredSkills()) {
            boolean has = userSkills.stream().anyMatch(us -> us.equalsIgnoreCase(req) || us.toLowerCase().contains(req.toLowerCase()) || req.toLowerCase().contains(us.toLowerCase()));
            if (has) {
                matched.add(req);
            } else {
                missing.add(req);
            }
        }

        int total = Math.max(1, career.getRequiredSkills().size());
        int readiness = (int) Math.round(((double) matched.size() / total) * 100);

        // Sequence missing skills logically: fundamentals -> frameworks -> databases -> devops/cloud
        List<String> sequence = new ArrayList<>(missing);
        sequence.sort(Comparator.comparingInt(this::getSkillPriorityOrder));

        return new SkillGapReport(
                false,
                new ArrayList<>(userSkills),
                matched,
                missing,
                Collections.emptyList(),
                sequence,
                readiness
        );
    }

    private int getSkillPriorityOrder(String skill) {
        String s = skill.toLowerCase();
        if (s.contains("java") || s.contains("python") || s.contains("c++") || s.contains("dsa") || s.contains("data structure")) return 1;
        if (s.contains("git") || s.contains("sql") || s.contains("database")) return 2;
        if (s.contains("spring") || s.contains("react") || s.contains("rest") || s.contains("api")) return 3;
        if (s.contains("docker") || s.contains("cloud") || s.contains("aws") || s.contains("ci/cd")) return 4;
        return 5;
    }
}
