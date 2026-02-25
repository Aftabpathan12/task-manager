package com.taskmanager.taskmanagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRoleRequest {
    private String role; // ADMIN or USER
}
