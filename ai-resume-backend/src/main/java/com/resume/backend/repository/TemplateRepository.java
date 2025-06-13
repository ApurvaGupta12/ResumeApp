package com.resume.backend.repository;

import com.resume.backend.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TemplateRepository extends JpaRepository<Template, Long> {
    List<Template> findByisActiveTrue();
    boolean existsByTemplateName(String templateName);

}
