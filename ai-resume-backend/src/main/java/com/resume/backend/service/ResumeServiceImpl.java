package com.resume.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resume.backend.model.ResumeData;
import com.resume.backend.repository.ResumeDataRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeServiceImpl implements ResumeService {

    @Autowired
    private ResumeDataRepository resumeDataRepository;

    @Override
    public ResumeData saveResume(ResumeData resumeData) {
        return resumeDataRepository.save(resumeData);
    }

    @Override
    public List<ResumeData> getAllResumes() {
        return resumeDataRepository.findAll();
    }

    @Override
    public Optional<ResumeData> getResumeById(Long id) {
        return resumeDataRepository.findById(id);
    }

    @Override
    public void deleteResume(Long id) {
        resumeDataRepository.deleteById(id);
    }
}
