package com.career.navigator.repository;

import com.career.navigator.model.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
    Optional<Career> findByCareerCode(String careerCode);
    List<Career> findByCategoryIgnoreCase(String category);
}
