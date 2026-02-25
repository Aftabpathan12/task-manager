package com.taskmanager.taskmanagement.controller;

import com.taskmanager.taskmanagement.dto.LoginRequestDTO;
import com.taskmanager.taskmanagement.dto.LoginResponseDTO;
import com.taskmanager.taskmanagement.dto.RegisterRequestDTO;
import com.taskmanager.taskmanagement.dto.UserResponseDTO;
import com.taskmanager.taskmanagement.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public UserResponseDTO register(@RequestBody RegisterRequestDTO dto) {
        return service.register(dto);
    }

    // ✅ LOGIN (FIXED)
 
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(service.login(dto));
    }


}
