package com.career.navigator.model;

import jakarta.persistence.*;
import java.util.*;

/**
 * JPA Entity capturing the student's adaptive profile input.
 * Supports different education tiers without forcing school students to have professional skills.
 */
@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "education_level", nullable = false)
    private EducationLevel educationLevel;

    // Stream (for Intermediate: MPC, BiPC, MEC, CEC, HEC, etc.)
    private String stream;

    // Branch (for B.Tech/Diploma: CSE, ECE, MECH, CIVIL, IT, AI/DS)
    private String branch;

    // Degree specialization (for BCA, B.Sc, B.Com, BA, etc.)
    private String degreeSpecialization;

    // Current year (1st, 2nd, 3rd, 4th, Completed)
    private String currentYear;

    private Double cgpaPercentage;
    private Integer backlogs = 0;

    // Subject/Academic performance for 10th & 12th
    private String academicPerformance; // "Excellent", "Good", "Average"
    private String mathPerformance;
    private String sciencePerformance;
    private String englishPerformance;

    @ElementCollection
    @CollectionTable(name = "profile_favorite_subjects", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "subject")
    private Set<String> favoriteSubjects = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "profile_interests", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "interest")
    private Set<String> interests = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "profile_personality_traits", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "trait")
    private Set<String> personalityTraits = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "profile_goals", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "goal")
    private Set<String> careerGoals = new HashSet<>();

    // Technical skills (for College / Diploma / PG)
    @ElementCollection
    @CollectionTable(name = "profile_skills", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "skill_name")
    private Set<String> technicalSkills = new HashSet<>();

    // Projects count & list
    private Integer projectCount = 0;
    private Integer certificationCount = 0;

    // Preferences
    private String workEnvironmentPref; // "Remote", "Office", "Hybrid", "Field"
    private String higherEdPref;        // "Immediate Job", "Higher Studies in India", "Study Abroad"
    private Boolean studyAbroadInterest = false;
    private String govtPrivatePref;      // "Private MNC", "Government / PSU", "Startup", "Flexible"

    public StudentProfile() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public EducationLevel getEducationLevel() { return educationLevel; }
    public void setEducationLevel(EducationLevel educationLevel) { this.educationLevel = educationLevel; }

    public String getStream() { return stream; }
    public void setStream(String stream) { this.stream = stream; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getDegreeSpecialization() { return degreeSpecialization; }
    public void setDegreeSpecialization(String degreeSpecialization) { this.degreeSpecialization = degreeSpecialization; }

    public String getCurrentYear() { return currentYear; }
    public void setCurrentYear(String currentYear) { this.currentYear = currentYear; }

    public Double getCgpaPercentage() { return cgpaPercentage; }
    public void setCgpaPercentage(Double cgpaPercentage) { this.cgpaPercentage = cgpaPercentage; }

    public Integer getBacklogs() { return backlogs; }
    public void setBacklogs(Integer backlogs) { this.backlogs = backlogs; }

    public String getAcademicPerformance() { return academicPerformance; }
    public void setAcademicPerformance(String academicPerformance) { this.academicPerformance = academicPerformance; }

    public String getMathPerformance() { return mathPerformance; }
    public void setMathPerformance(String mathPerformance) { this.mathPerformance = mathPerformance; }

    public String getSciencePerformance() { return sciencePerformance; }
    public void setSciencePerformance(String sciencePerformance) { this.sciencePerformance = sciencePerformance; }

    public String getEnglishPerformance() { return englishPerformance; }
    public void setEnglishPerformance(String englishPerformance) { this.englishPerformance = englishPerformance; }

    public Set<String> getFavoriteSubjects() { return favoriteSubjects; }
    public void setFavoriteSubjects(Set<String> favoriteSubjects) { this.favoriteSubjects = favoriteSubjects; }

    public Set<String> getInterests() { return interests; }
    public void setInterests(Set<String> interests) { this.interests = interests; }

    public Set<String> getPersonalityTraits() { return personalityTraits; }
    public void setPersonalityTraits(Set<String> personalityTraits) { this.personalityTraits = personalityTraits; }

    public Set<String> getCareerGoals() { return careerGoals; }
    public void setCareerGoals(Set<String> careerGoals) { this.careerGoals = careerGoals; }

    public Set<String> getTechnicalSkills() { return technicalSkills; }
    public void setTechnicalSkills(Set<String> technicalSkills) { this.technicalSkills = technicalSkills; }

    public Integer getProjectCount() { return projectCount; }
    public void setProjectCount(Integer projectCount) { this.projectCount = projectCount; }

    public Integer getCertificationCount() { return certificationCount; }
    public void setCertificationCount(Integer certificationCount) { this.certificationCount = certificationCount; }

    public String getWorkEnvironmentPref() { return workEnvironmentPref; }
    public void setWorkEnvironmentPref(String workEnvironmentPref) { this.workEnvironmentPref = workEnvironmentPref; }

    public String getHigherEdPref() { return higherEdPref; }
    public void setHigherEdPref(String higherEdPref) { this.higherEdPref = higherEdPref; }

    public Boolean getStudyAbroadInterest() { return studyAbroadInterest; }
    public void setStudyAbroadInterest(Boolean studyAbroadInterest) { this.studyAbroadInterest = studyAbroadInterest; }

    public String getGovtPrivatePref() { return govtPrivatePref; }
    public void setGovtPrivatePref(String govtPrivatePref) { this.govtPrivatePref = govtPrivatePref; }
}
