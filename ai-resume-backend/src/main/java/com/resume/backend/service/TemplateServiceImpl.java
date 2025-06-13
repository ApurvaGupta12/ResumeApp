package com.resume.backend.service;

import com.resume.backend.model.Template;
import com.resume.backend.repository.TemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TemplateServiceImpl implements TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateServiceImpl(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @Override
    public List<Template> getActiveTemplates() {
        return templateRepository.findByisActiveTrue();
    }
    
    @Override
    public List<Template> getAllTemplates() {
        return templateRepository.findAll();
    }
    @Override
    public Template getTemplateById(Long id) {
        return templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found with id: " + id));
    }
    @Override
    public Template updateTemplateStatus(Long id, boolean isActive) {
        Optional<Template> optionalTemplate = templateRepository.findById(id);
        if (optionalTemplate.isPresent()) {
            Template template = optionalTemplate.get();
            template.setActive(isActive);
            return templateRepository.save(template);
        } else {
            return null;
        }
    }
}
