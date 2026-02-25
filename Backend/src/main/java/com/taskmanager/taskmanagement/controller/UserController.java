//package com.taskmanager.taskmanagement.controller;
//
//import com.taskmanager.taskmanagement.dto.UserProfileResponse;
//import com.taskmanager.taskmanagement.entity.User;
//import com.taskmanager.taskmanagement.service.UserService;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//
//    private final UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    /**
//     * Get logged-in user's profile (JWT based)
//     */
//    @GetMapping("/me")
//    public UserProfileResponse getMyProfile(Authentication authentication) {
//
//        String email = authentication.getName();
//
//        User user = userService.getByEmail(email);
//
//        return new UserProfileResponse(
//                user.getId(),
//                user.getEmail(),
//                user.getRole().getName(),
//                "ACTIVE"
//        );
//    }
//}

package com.taskmanager.taskmanagement.controller;

import com.taskmanager.taskmanagement.dto.UpdateProfileRequest;
import com.taskmanager.taskmanagement.dto.UserProfileResponse;
import com.taskmanager.taskmanagement.entity.User;
import com.taskmanager.taskmanagement.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ GET LOGGED-IN USER PROFILE
    @GetMapping("/me")
    public UserProfileResponse getMyProfile(Authentication authentication) {

        User user = userService.getByEmail(authentication.getName());

        return new UserProfileResponse(
                user.getId(),
                user.getEmail(),
                user.getRole().getName(),
                "ACTIVE"
        );
    }

    // ✅ EDIT PROFILE (EDIT BUTTON API)
    @PutMapping("/me")
    public UserProfileResponse updateMyProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request
    ) {

        User updatedUser = userService.updateProfile(
                authentication.getName(),
                request.getEmail()
        );

        return new UserProfileResponse(
                updatedUser.getId(),
                updatedUser.getEmail(),
                updatedUser.getRole().getName(),
                "ACTIVE"
        );
    }
}

