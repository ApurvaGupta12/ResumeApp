package com.resume.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Personal Information
    private String fullName;
    private String email;
    private String phoneNumber;
    private String location;
    private String linkedIn;
    private String gitHub;
    private String portFolio;

    // Summary
    @Column(columnDefinition = "TEXT")
    private String summary;

    // Skills
    @ElementCollection
    private List<Skill> skills;

    // Experience
    @ElementCollection
    private List<Experience> experience;

    // Education
    @ElementCollection
    private List<Education> education;

    // Certifications
    @ElementCollection
    private List<Certification> certifications;

    // Projects
    @OneToMany(cascade = CascadeType.ALL)
    private List<Project> projects;

    // Achievements
    @ElementCollection
    private List<Achievement> achievements;

    // Languages
    @ElementCollection
    private List<Language> languages;

    // Interests
    @ElementCollection
    private List<Interest> interests;

    // User relationship (ManyToOne)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Embedded Classes
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Skill {
        private String title;
        private String level;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Experience {
        private String jobTitle;
        private String company;
        private String startDate;
        private String endDate;
        private String location;
        @Column(columnDefinition = "TEXT")
        private String responsibility;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Education {
        private String degree;
        private String university;
        private String startDate;
        private String endDate;
        private String location;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Certification {
        private String title;
        private String issuingOrganization;
        private String year;
    }

   
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Achievement {
        private String title;
        private String year;
        private String extraInformation;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Language {
        private String name;
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Interest {
        private String name;
    }
}
