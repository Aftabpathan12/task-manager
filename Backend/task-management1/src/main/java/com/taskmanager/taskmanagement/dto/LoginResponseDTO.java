package com.taskmanager.taskmanagement.dto;

public class LoginResponseDTO {

    private String token;
    private String email;
    private String role;

    // ✅ REQUIRED constructor (THIS fixes red lines)
    public LoginResponseDTO(String token, String email, String role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

    // getters
    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}
