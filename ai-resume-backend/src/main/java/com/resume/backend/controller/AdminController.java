package com.resume.backend.controller;

import com.resume.backend.dto.RoleUpdateRequest;
import com.resume.backend.model.User;
import com.resume.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @PutMapping("/users/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserRole(
        @PathVariable Long userId,
        @RequestBody RoleUpdateRequest request) {

        String newRole = request.getNewRole();
        if (!userService.getValidRoles().contains(newRole.toUpperCase())) {
            throw new IllegalArgumentException("Invalid role: " + newRole);
        }
        User updatedUser = userService.updateUserRole(userId, newRole);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/{userId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUserStatus(
            @PathVariable Long userId,
            @RequestBody Boolean activeStatus) {
        User updatedUser = userService.updateUserStatus(userId, activeStatus);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }
}
