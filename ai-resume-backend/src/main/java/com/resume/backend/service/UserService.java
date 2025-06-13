package com.resume.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.resume.backend.model.User;
@Service
public interface UserService {
    User saveUser(User user);
    User findByEmail(String email);
    User registerUser(User user);  
    boolean authenticate(String email, String password);  
    List<User> getAllUsers();
    User updateUserRole(Long userId, String newRole);
    User updateUserStatus(Long userId, Boolean activeStatus);
    List<String> getValidRoles();

}

