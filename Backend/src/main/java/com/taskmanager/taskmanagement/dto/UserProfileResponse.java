package com.taskmanager.taskmanagement.dto;

public record UserProfileResponse(
        Long id,
        String email,
        String role,
        String status
) {}
