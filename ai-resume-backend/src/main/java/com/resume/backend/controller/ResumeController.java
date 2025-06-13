package com.resume.backend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.resume.backend.repository.ResumeDataRepository;
import com.resume.backend.model.ResumeData;
import com.resume.backend.model.User;
import com.resume.backend.service.ResumeService;
import com.resume.backend.service.UserService;
import com.resume.backend.utility.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ResumeService resumeService;
    @Autowired
    private ResumeDataRepository resumeRepo;
    @Autowired
    private UserService userService;  
    @PostMapping("/create")
    public ResumeData createResume(@RequestBody ResumeData resumeData, @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String jwt = authHeader.substring(7); // remove "Bearer "
        String email = jwtUtil.extractUsername(jwt); // extract email from token
        // Set the email and user reference for the resume
        resumeData.setEmail(email); 
        // Fetch the user by email
        User user = userService.findByEmail(email);
        resumeData.setUser(user); // Associate the resume with the user
        return resumeService.saveResume(resumeData);
    }

    @GetMapping
    public List<ResumeData> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public ResumeData getResumeById(@PathVariable Long id) {
        return resumeService.getResumeById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
    }

    @GetMapping("/my-resumes")
    public List<ResumeData> getMyResumes(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        String jwt = authHeader.substring(7); // remove "Bearer "
        String email = jwtUtil.extractUsername(jwt); // extract email from token
        User user = userService.findByEmail(email); // find the user by email
        return resumeRepo.findByUser(user); // get resumes for that user
    }
}
