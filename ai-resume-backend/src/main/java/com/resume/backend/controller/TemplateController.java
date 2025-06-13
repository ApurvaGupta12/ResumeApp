package com.resume.backend.controller;

import com.resume.backend.model.Template;
import com.resume.backend.service.TemplateService;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/templates") 

public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Template>> getAllTemplates() {
        return ResponseEntity.ok(templateService.getAllTemplates());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Template>> getActiveTemplates() {
        return ResponseEntity.ok(templateService.getActiveTemplates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Template> getTemplateById(@PathVariable Long id) {
        return ResponseEntity.ok(templateService.getTemplateById(id));
    }
    @PutMapping("/admin/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateTemplateStatus(
            @PathVariable Long id,
            @RequestParam boolean isActive) {
        
        Template updatedTemplate = templateService.updateTemplateStatus(id, isActive);
        if (updatedTemplate == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Template status updated successfully");
    }

}
