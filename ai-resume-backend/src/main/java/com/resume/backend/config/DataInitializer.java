package com.resume.backend.config;

import com.resume.backend.model.Template;
import com.resume.backend.repository.TemplateRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
//Template seeder class 
public class DataInitializer {

    private final TemplateRepository templateRepository;

    public DataInitializer(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @PostConstruct
    public void insertFrontendTemplates() {
        List<Template> templates = new ArrayList<>();
        String baseUrl = "https://yourdomain.com/previews/"; 

        for (int i = 1; i <= 9; i++) {
            String name = "Template " + i;
            String url = baseUrl + "template" + i + ".png";

            Template template = new Template();
            template.setTemplateName(name);
            template.setTemplatePreviewUrl(url);
            template.setActive(true);
            template.setDescription("Auto-inserted from seeder");
            template.setTemplateKey("template_" + i); // for internal mapping

            templates.add(template);
        }

        for (Template template : templates) {
            if (!templateRepository.existsByTemplateName(template.getTemplateName())) {
                templateRepository.save(template);
                System.out.println("Inserted: " + template.getTemplateName());
            } else {
                System.out.println("Already exists: " + template.getTemplateName());
            }
        }
    }
}
