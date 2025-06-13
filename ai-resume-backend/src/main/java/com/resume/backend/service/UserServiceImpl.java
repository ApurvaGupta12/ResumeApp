package com.resume.backend.service;

import com.resume.backend.model.User;
import com.resume.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	private static final List<String> VALID_ROLES = List.of("ADMIN", "USER");

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER"); 
        }
        if (user.getActive() == null) {
            user.setActive(true);  
        }
        return userRepository.save(user);
    }
    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public List<String> getValidRoles() {
        return VALID_ROLES;
    }

    @Override
    public User updateUserRole(Long userId, String newRole) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return null;
        }
        
        // Validation for role
        if (!VALID_ROLES.contains(newRole.toUpperCase())) {
            throw new IllegalArgumentException("Invalid role: " + newRole);
        }
        
        User user = optionalUser.get();
        user.setRole(newRole.toUpperCase());
        return userRepository.save(user);
    }


    @Override
    public User updateUserStatus(Long userId, Boolean activeStatus) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return null;
        }
        User user = optionalUser.get();
        user.setActive(activeStatus);
        return userRepository.save(user);
    }
    

    @Override
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + user.getEmail());
        }
        return saveUser(user);
    }

    @Override
    public boolean authenticate(String email, String password) {
        User user = findByEmail(email);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }
}
