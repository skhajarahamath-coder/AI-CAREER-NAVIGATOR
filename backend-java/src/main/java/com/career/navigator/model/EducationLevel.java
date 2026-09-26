package com.career.navigator.model;

/**
 * Enumeration representing the user's educational stage.
 * Used by the adaptive questionnaire and the recommendation engine.
 */
public enum EducationLevel {
    TENTH("10th / Secondary School"),
    INTERMEDIATE_12TH("Intermediate / 12th Standard"),
    DIPLOMA("Polytechnic / Diploma"),
    BTECH_BE("B.Tech / B.E Engineering"),
    DEGREE("Degree (BCA, B.Sc, B.Com, BA, etc.)"),
    POSTGRADUATE("Postgraduate (M.Tech, MCA, MBA, M.Sc, etc.)");

    private final String displayName;

    EducationLevel(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static EducationLevel fromString(String text) {
        if (text == null) return TENTH;
        String normalized = text.trim().toUpperCase().replace(" ", "_").replace("/", "_").replace(".", "");
        for (EducationLevel level : EducationLevel.values()) {
            if (level.name().equalsIgnoreCase(normalized) || level.getDisplayName().equalsIgnoreCase(text)) {
                return level;
            }
        }
        if (normalized.contains("10")) return TENTH;
        if (normalized.contains("12") || normalized.contains("INTER")) return INTERMEDIATE_12TH;
        if (normalized.contains("DIPLOMA")) return DIPLOMA;
        if (normalized.contains("BTECH") || normalized.contains("BE")) return BTECH_BE;
        if (normalized.contains("POST") || normalized.contains("MASTER") || normalized.contains("MTECH") || normalized.contains("MCA")) return POSTGRADUATE;
        if (normalized.contains("DEGREE") || normalized.contains("BCA") || normalized.contains("BSC")) return DEGREE;
        return TENTH;
    }
}
