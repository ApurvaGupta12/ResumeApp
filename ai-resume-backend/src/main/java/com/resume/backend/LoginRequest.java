package com.resume.backend;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
    private String role;
}
