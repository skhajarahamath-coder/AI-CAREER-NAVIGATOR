package com.career.navigator.controller;

import com.career.navigator.engine.CareerRecommendationEngine;
import com.career.navigator.engine.RoadmapGeneratorEngine;
import com.career.navigator.engine.SkillGapAnalyzer;
import com.career.navigator.model.Career;
import com.career.navigator.model.StudentProfile;
import com.career.navigator.service.CareerService;
import com.career.navigator.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final CareerService careerService;

    @Autowired
    public RecommendationController(RecommendationService recommendationService, CareerService careerService) {
        this.recommendationService = recommendationService;
        this.careerService = careerService;
    }

    @PostMapping("/evaluate")
    public ResponseEntity<List<CareerRecommendationEngine.ScoredCareer>> evaluateProfile(
            @RequestBody StudentProfile profile,
            @RequestParam(defaultValue = "5") int limit) {
        List<CareerRecommendationEngine.ScoredCareer> results = recommendationService.getTopRecommendations(profile, limit);
        return ResponseEntity.ok(results);
    }

    @PostMapping("/roadmap/{careerId}")
    public ResponseEntity<RoadmapGeneratorEngine.GeneratedRoadmap> getPersonalizedRoadmap(
            @PathVariable Long careerId,
            @RequestBody StudentProfile profile) {
        return careerService.getCareerById(careerId)
                .map(career -> ResponseEntity.ok(recommendationService.getPersonalizedRoadmap(profile, career)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/skill-gap/{careerId}")
    public ResponseEntity<SkillGapAnalyzer.SkillGapReport> getSkillGapAnalysis(
            @PathVariable Long careerId,
            @RequestBody StudentProfile profile) {
        return careerService.getCareerById(careerId)
                .map(career -> ResponseEntity.ok(recommendationService.getSkillGapReport(profile, career)))
                .orElse(ResponseEntity.notFound().build());
    }
}
