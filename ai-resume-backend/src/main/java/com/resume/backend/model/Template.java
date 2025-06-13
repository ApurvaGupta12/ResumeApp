package com.resume.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "templates") 
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "template_name")
    private String templateName;

    @Column(name = "template_preview_url")
    private String templatePreviewUrl;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "description")
    private String description;

    @Column(name = "template_key")
    private String templateKey;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getTemplatePreviewUrl() {
        return templatePreviewUrl;
    }

    public void setTemplatePreviewUrl(String templatePreviewUrl) {
        this.templatePreviewUrl = templatePreviewUrl;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTemplateKey() {
        return templateKey;
    }

    public void setTemplateKey(String templateKey) {
        this.templateKey = templateKey;
    }
}
