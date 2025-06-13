package com.resume.backend.controller;

import com.resume.backend.LoginRequest;
import com.resume.backend.SignupRequest;
import com.resume.backend.model.User;
import com.resume.backend.service.UserService;
import com.resume.backend.utility.JwtUtil;

//import java.util.HashMap;
//import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.resume.backend.dto.LoginResponse;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    //private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
       // this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    //  Signup/Register with fullName, email, password from SignupRequest
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignupRequest signupRequest) {
        User newUser = new User();
        newUser.setEmail(signupRequest.getEmail());
        //newUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));  // encoding here only
        newUser.setPassword(signupRequest.getPassword());
        newUser.setFullName(signupRequest.getFullName());
        newUser.setRole("USER");
        newUser.setActive(true);
        return ResponseEntity.ok(userService.registerUser(newUser));
    }

    // Login with email and password
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.authenticate(
            loginRequest.getEmail(), loginRequest.getPassword()
        );

        if (isAuthenticated) {
        	User user = userService.findByEmail(loginRequest.getEmail());
        	String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

            // LoginResponse object return 
            LoginResponse response = new LoginResponse(token, user.getEmail(), user.getRole());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
   
    // Secured Profile Page - Only accessible for authenticated users
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(null); // Unauthorized if no token or invalid token
        }

        String jwt = token.substring(7); // Removing "Bearer " from token
        String email = jwtUtil.extractUsername(jwt);
        User user = userService.findByEmail(email);
        
        if (user == null || !jwtUtil.validateToken(jwt, user.getEmail())) {
            return ResponseEntity.status(401).body(null); // Unauthorized if invalid token or user not found
        }

        return ResponseEntity.ok(user);
    }

 // Secured Editable Resume Page - Only accessible for authenticated users
    @GetMapping("/edit-template/{id}")
    public ResponseEntity<String> getEditableResume(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") int templateId) {

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized"); // Unauthorized if no token or invalid token
        }

        String jwt = token.substring(7); // "Bearer " 
        String email = jwtUtil.extractUsername(jwt);
        User user = userService.findByEmail(email);

        if (user == null || !jwtUtil.validateToken(jwt, user.getEmail())) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return ResponseEntity.ok("Editable Resume Page for Template ID: " + templateId);
    }
}
