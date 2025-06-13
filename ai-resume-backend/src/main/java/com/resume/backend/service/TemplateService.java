package com.resume.backend.service;

import com.resume.backend.model.Template;
import java.util.List;

public interface TemplateService {
	List<Template> getAllTemplates();
	Template getTemplateById(Long id);
    List<Template> getActiveTemplates();
    Template updateTemplateStatus(Long id, boolean isActive);

}
