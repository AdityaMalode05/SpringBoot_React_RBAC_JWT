package com.RBAC.auth.controller;

import com.RBAC.auth.dto.UserRequest;
import com.RBAC.auth.dto.UserResponse;
import com.RBAC.auth.entity.User;
import com.RBAC.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(@RequestParam String email) {
        return ResponseEntity.ok(userService.getByEmail(email));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserRequest request
    ) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }
}
