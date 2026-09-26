package com.career.navigator.model;

import jakarta.persistence.*;
import java.util.*;

/**
 * Entity representing an extensible career path in the database.
 */
@Entity
@Table(name = "careers")
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String careerCode;

    @Column(nullable = false)
    private String title;

    private String category; // "Software & Cloud", "AI & Data", "Core Engineering", "Design & Product", "Business & Analytics", "Healthcare & Life Sciences", "Civil & Public Services"

    @Column(length = 2000)
    private String description;

    private String beginnerDifficulty; // "Easy", "Moderate", "Challenging", "Advanced"

    @ElementCollection
    @CollectionTable(name = "career_preferred_edus", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "edu_level")
    private Set<String> preferredEducationLevels = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "career_compatible_degrees", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "degree")
    private Set<String> compatibleDegrees = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "career_related_interests", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "interest")
    private Set<String> relatedInterests = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "career_important_subjects", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "subject")
    private Set<String> importantSubjects = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "career_required_skills_list", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "skill_name")
    private Set<String> requiredSkills = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "career_entry_roles", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "role_title")
    private List<String> entryLevelRoles = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "career_advanced_roles", joinColumns = @JoinColumn(name = "career_id"))
    @Column(name = "role_title")
    private List<String> advancedRoles = new ArrayList<>();

    private Double approxSalaryMinLpa;
    private Double approxSalaryMaxLpa;
    private String salaryReferenceSource = "Industry Reference Dataset 2024 (Approximate Range)";

    public Career() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCareerCode() { return careerCode; }
    public void setCareerCode(String careerCode) { this.careerCode = careerCode; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBeginnerDifficulty() { return beginnerDifficulty; }
    public void setBeginnerDifficulty(String beginnerDifficulty) { this.beginnerDifficulty = beginnerDifficulty; }

    public Set<String> getPreferredEducationLevels() { return preferredEducationLevels; }
    public void setPreferredEducationLevels(Set<String> preferredEducationLevels) { this.preferredEducationLevels = preferredEducationLevels; }

    public Set<String> getCompatibleDegrees() { return compatibleDegrees; }
    public void setCompatibleDegrees(Set<String> compatibleDegrees) { this.compatibleDegrees = compatibleDegrees; }

    public Set<String> getRelatedInterests() { return relatedInterests; }
    public void setRelatedInterests(Set<String> relatedInterests) { this.relatedInterests = relatedInterests; }

    public Set<String> getImportantSubjects() { return importantSubjects; }
    public void setImportantSubjects(Set<String> importantSubjects) { this.importantSubjects = importantSubjects; }

    public Set<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(Set<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public List<String> getEntryLevelRoles() { return entryLevelRoles; }
    public void setEntryLevelRoles(List<String> entryLevelRoles) { this.entryLevelRoles = entryLevelRoles; }

    public List<String> getAdvancedRoles() { return advancedRoles; }
    public void setAdvancedRoles(List<String> advancedRoles) { this.advancedRoles = advancedRoles; }

    public Double getApproxSalaryMinLpa() { return approxSalaryMinLpa; }
    public void setApproxSalaryMinLpa(Double approxSalaryMinLpa) { this.approxSalaryMinLpa = approxSalaryMinLpa; }

    public Double getApproxSalaryMaxLpa() { return approxSalaryMaxLpa; }
    public void setApproxSalaryMaxLpa(Double approxSalaryMaxLpa) { this.approxSalaryMaxLpa = approxSalaryMaxLpa; }

    public String getSalaryReferenceSource() { return salaryReferenceSource; }
    public void setSalaryReferenceSource(String salaryReferenceSource) { this.salaryReferenceSource = salaryReferenceSource; }
}
