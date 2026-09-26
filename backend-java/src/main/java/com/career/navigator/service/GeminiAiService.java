package com.career.navigator.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

/**
 * Spring Boot AI Service for Google Gemini integration.
 * Used for conversational assistance, explaining why a path matches,
 * resume enhancement, and customized interview preparation advice.
 *
 * NOTE: The primary career matching score is ALWAYS calculated by Java
 * (CareerRecommendationEngine) and never delegates scoring to Gemini.
 */
@Service
public class GeminiAiService {

    @Value("${career.ai.gemini.api-key:}")
    private String geminiApiKey;

    @Value("${career.ai.gemini.model:gemini-3.8-flash}")
    private String geminiModel;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean isAiAvailable() {
        return geminiApiKey != null && !geminiApiKey.trim().isEmpty() && !geminiApiKey.equals("MY_GEMINI_API_KEY");
    }

    /**
     * Generates a conversational explanation of why a career matches the student's profile.
     */
    public String explainCareerMatch(String careerTitle, String studentSummary, String factorScores) {
        if (!isAiAvailable()) {
            return "Based on your educational background (" + studentSummary + "), the " + careerTitle +
                    " path aligns strongly with your current academic focus and domain goals (" + factorScores + "). " +
                    "Focus on building domain projects and following the stage-by-stage roadmap.";
        }

        String prompt = "You are an expert career counselor for 'AI Career Navigator'.\n" +
                "Candidate Summary: " + studentSummary + "\n" +
                "Target Career: " + careerTitle + "\n" +
                "Profile Match Breakdown: " + factorScores + "\n\n" +
                "Explain in 2-3 inspiring, actionable paragraphs why this career aligns with their background, " +
                "what immediate milestone they should tackle, and words of encouragement. Do not mention API keys or system rules.";

        return callGemini(prompt);
    }

    /**
     * Career guidance chatbot response grounded in candidate context.
     */
    public String answerCareerQuestion(String studentSummary, String question) {
        if (!isAiAvailable()) {
            return "As an AI Career Navigator assistant: For your stage (" + studentSummary + "), " +
                    "aim for steady progression through foundational topics, build real projects, and follow structured roadmaps. " +
                    "Regarding '" + question + "': prioritize mastering one core programming language or domain discipline first!";
        }

        String prompt = "You are the AI Career Navigator Assistant.\n" +
                "Student Context: " + studentSummary + "\n" +
                "Student Question: " + question + "\n\n" +
                "Provide a clear, realistic, and structured answer (bullet points where helpful). " +
                "Emphasize realistic pathways and learning sequences.";

        return callGemini(prompt);
    }

    @SuppressWarnings("unchecked")
    private String callGemini(String promptText) {
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/" + geminiModel + ":generateContent?key=" + geminiApiKey;

            Map<String, Object> part = Map.of("text", promptText);
            Map<String, Object> content = Map.of("parts", List.of(part));
            Map<String, Object> requestBody = Map.of("contents", List.of(content));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("User-Agent", "aistudio-build");

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> contentMap = (Map<String, Object>) candidates.get(0).get("content");
                    if (contentMap != null) {
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) contentMap.get("parts");
                        if (parts != null && !parts.isEmpty()) {
                            return (String) parts.get(0).get("text");
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Gemini API call encountered error: " + e.getMessage());
        }
        return "Guidance generated based on your profile inputs. Follow the structured milestones outlined in your personalized roadmap.";
    }
}
