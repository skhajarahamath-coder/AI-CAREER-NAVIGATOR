package com.career.navigator.repository;

import com.career.navigator.model.EducationLevel;
import com.career.navigator.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    List<StudentProfile> findByEducationLevel(EducationLevel educationLevel);
}
