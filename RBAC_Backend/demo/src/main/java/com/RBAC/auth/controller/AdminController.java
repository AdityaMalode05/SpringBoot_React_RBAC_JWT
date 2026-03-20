package com.RBAC.auth.controller;

import com.RBAC.auth.dto.UserRequest;
import com.RBAC.auth.dto.UserResponse;
import com.RBAC.auth.entity.User;
import com.RBAC.auth.repository.UserRepository;
import com.RBAC.auth.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private AdminService adminService;


    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {
        return repo.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name()
                ))
                .toList();
    }


    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        repo.deleteById(id);
        return "User deleted successfully";
    }

    @PostMapping("/create-user")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest request) {
        return ResponseEntity.ok(adminService.createUser(request));
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserRequest request
    ) {
        return ResponseEntity.ok(adminService.updateUser(id, request));
    }
}