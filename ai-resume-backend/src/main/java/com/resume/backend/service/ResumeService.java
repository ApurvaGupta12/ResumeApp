package com.resume.backend.service;

import com.resume.backend.model.ResumeData;

import java.util.List;
import java.util.Optional;

public interface ResumeService {

    ResumeData saveResume(ResumeData resumeData);

    List<ResumeData> getAllResumes();

    Optional<ResumeData> getResumeById(Long id);

    void deleteResume(Long id);
}
