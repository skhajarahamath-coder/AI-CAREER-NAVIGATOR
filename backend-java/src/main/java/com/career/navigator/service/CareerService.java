package com.career.navigator.service;

import com.career.navigator.model.Career;
import com.career.navigator.repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CareerService {

    private final CareerRepository careerRepository;

    @Autowired
    public CareerService(CareerRepository careerRepository) {
        this.careerRepository = careerRepository;
    }

    public List<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    public Optional<Career> getCareerById(Long id) {
        return careerRepository.findById(id);
    }

    public Optional<Career> getCareerByCode(String code) {
        return careerRepository.findByCareerCode(code);
    }

    public List<Career> getCareersByCategory(String category) {
        return careerRepository.findByCategoryIgnoreCase(category);
    }

    public Career saveCareer(Career career) {
        return careerRepository.save(career);
    }
}
