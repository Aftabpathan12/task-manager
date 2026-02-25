//package com.taskmanager.taskmanagement.service;
//
//import com.taskmanager.taskmanagement.entity.User;
//import com.taskmanager.taskmanagement.exception.ResourceNotFoundException;
//import com.taskmanager.taskmanagement.repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//
//    private final UserRepository userRepository;
//
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    /**
//     * Get user by email (used by /users/me)
//     */
//    public User getByEmail(String email) {
//        return userRepository.findByEmail(email)
//                .orElseThrow(() ->
//                        new ResourceNotFoundException("User not found with email: " + email)
//                );
//    }
//
//    /**
//     * Optional: get user by id (admin / future use)
//     */
//    public User getUser(Long id) {
//        return userRepository.findById(id)
//                .orElseThrow(() ->
//                        new ResourceNotFoundException("User not found with id: " + id)
//                );
//    }
//}

package com.taskmanager.taskmanagement.service;

import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.exception.ResourceNotFoundException;
import com.taskmanager.taskmanagement.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ Used by GET /users/me
    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with email: " + email
                        )
                );
    }

    // ✅ Used by Edit Profile
    public User updateProfile(String email, String newEmail) {

        User user = getByEmail(email);

        // 🔴 prevent duplicate email
        if (userRepository.existsByEmail(newEmail)
                && !user.getEmail().equals(newEmail)) {
            throw new RuntimeException("Email already in use");
        }

        user.setEmail(newEmail);
        return userRepository.save(user);
    }


    // Optional (future use)
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + id
                        )
                );
    }
}

