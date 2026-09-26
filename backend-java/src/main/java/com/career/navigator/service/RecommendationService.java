package com.career.navigator.service;

import com.career.navigator.engine.CareerRecommendationEngine;
import com.career.navigator.engine.RoadmapGeneratorEngine;
import com.career.navigator.engine.SkillGapAnalyzer;
import com.career.navigator.model.Career;
import com.career.navigator.model.StudentProfile;
import com.career.navigator.repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private final CareerRecommendationEngine recommendationEngine;
    private final RoadmapGeneratorEngine roadmapEngine;
    private final SkillGapAnalyzer skillGapAnalyzer;
    private final CareerRepository careerRepository;

    @Autowired
    public RecommendationService(CareerRecommendationEngine recommendationEngine,
                                 RoadmapGeneratorEngine roadmapEngine,
                                 SkillGapAnalyzer skillGapAnalyzer,
                                 CareerRepository careerRepository) {
        this.recommendationEngine = recommendationEngine;
        this.roadmapEngine = roadmapEngine;
        this.skillGapAnalyzer = skillGapAnalyzer;
        this.careerRepository = careerRepository;
    }

    public List<CareerRecommendationEngine.ScoredCareer> getTopRecommendations(StudentProfile profile, int limit) {
        List<Career> allCareers = careerRepository.findAll();
        List<CareerRecommendationEngine.ScoredCareer> ranked = recommendationEngine.rankCareers(profile, allCareers);
        return ranked.stream().limit(limit > 0 ? limit : 5).toList();
    }

    public RoadmapGeneratorEngine.GeneratedRoadmap getPersonalizedRoadmap(StudentProfile profile, Career career) {
        return roadmapEngine.generatePersonalizedRoadmap(profile, career);
    }

    public SkillGapAnalyzer.SkillGapReport getSkillGapReport(StudentProfile profile, Career career) {
        return skillGapAnalyzer.analyze(profile, career);
    }
}
