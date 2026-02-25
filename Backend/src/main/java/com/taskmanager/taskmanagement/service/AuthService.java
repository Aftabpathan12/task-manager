//package com.taskmanager.taskmanagement.service;
//
//import com.taskmanager.taskmanagement.dto.LoginRequestDTO;
//import com.taskmanager.taskmanagement.dto.LoginResponseDTO;
//import com.taskmanager.taskmanagement.dto.RegisterRequestDTO;
//import com.taskmanager.taskmanagement.dto.UserResponseDTO;
//import com.taskmanager.taskmanagement.entity.Role;
//import com.taskmanager.taskmanagement.entity.User;
//import com.taskmanager.taskmanagement.repository.RoleRepository;
//import com.taskmanager.taskmanagement.repository.UserRepository;
//import com.taskmanager.taskmanagement.security.JwtUtil;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class AuthService {
//
//    private final UserRepository userRepo;
//    private final RoleRepository roleRepo;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtUtil jwtUtil;
//
//    public AuthService(
//            UserRepository userRepo,
//            RoleRepository roleRepo,
//            PasswordEncoder passwordEncoder,
//            JwtUtil jwtUtil
//    ) {
//        this.userRepo = userRepo;
//        this.roleRepo = roleRepo;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtUtil = jwtUtil;
//    }
//
//    // ✅ REGISTER
//    @Transactional
//    public UserResponseDTO register(RegisterRequestDTO dto) {
//
//        User user = new User();
//        user.setName(dto.getName());
//        user.setEmail(dto.getEmail());
//        user.setPassword(passwordEncoder.encode(dto.getPassword()));
//
//        String roleName = dto.getRole() != null ? dto.getRole() : "USER";
//
//        Role role = roleRepo.findByName(roleName)
//                .orElseGet(() -> {
//                    Role newRole = new Role();
//                    newRole.setName(roleName);
//                    return roleRepo.save(newRole);
//                });
//
//        user.setRole(role);
//        User savedUser = userRepo.save(user);
//
//        UserResponseDTO response = new UserResponseDTO();
//        response.setId(savedUser.getId());
//        response.setName(savedUser.getName());
//        response.setEmail(savedUser.getEmail());
//        response.setRole(savedUser.getRole().getName());
//
//        return response;
//    }
//
//    public LoginResponseDTO login(LoginRequestDTO dto) {
//
//        User user = userRepo.findByEmail(dto.getEmail())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
//            throw new RuntimeException("Invalid credentials");
//        }
//
//        String token = jwtUtil.generateToken(user.getEmail());
//
//        return new LoginResponseDTO(
//                token,
//                user.getEmail(),
//                user.getRole().getName()
//        );
//    }
//
//

package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.dto.LoginRequestDTO;
import com.taskmanager.taskmanagement.dto.LoginResponseDTO;
import com.taskmanager.taskmanagement.dto.RegisterRequestDTO;
import com.taskmanager.taskmanagement.dto.UserResponseDTO;
import com.taskmanager.taskmanagement.entity.Role;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.repository.RoleRepository;
import com.taskmanager.taskmanagement.repository.UserRepository;
import com.taskmanager.taskmanagement.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepo,
            RoleRepository roleRepo,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // ✅ REGISTER
    @Transactional
    public UserResponseDTO register(RegisterRequestDTO dto) {

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        String roleName = dto.getRole() != null ? dto.getRole() : "USER";

        Role role = roleRepo.findByName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(roleName);
                    return roleRepo.save(newRole);
                });

        user.setRole(role);
        User savedUser = userRepo.save(user);

        UserResponseDTO response = new UserResponseDTO();
        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole().getName());

        return response;
    }

    // ✅ LOGIN (NO ERROR NOW)
    public LoginResponseDTO login(LoginRequestDTO dto) {

        User user = userRepo.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // ✅ THIS LINE IS NOW VALID
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().getName()
        );


        return new LoginResponseDTO(
                token,
                user.getEmail(),
                user.getRole().getName()
        );
    }
}

