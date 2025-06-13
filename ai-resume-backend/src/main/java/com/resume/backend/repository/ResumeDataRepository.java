package com.resume.backend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resume.backend.model.ResumeData;
import com.resume.backend.model.User;

public interface ResumeDataRepository extends JpaRepository<ResumeData, Long> {
	// List<ResumeData> findByEmail(String email);
	 List<ResumeData> findByUser(User user);

}
