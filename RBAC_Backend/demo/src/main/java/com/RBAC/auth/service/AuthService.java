package com.RBAC.auth.service;

import com.RBAC.auth.dto.AuthResponse;
import com.RBAC.auth.dto.LoginRequest;
import com.RBAC.auth.dto.RegisterRequest;
import com.RBAC.auth.entity.User;
import com.RBAC.auth.repository.UserRepository;
import com.RBAC.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public void register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        repo.save(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = repo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        System.out.println("User found: " + user.getEmail());

        return new AuthResponse(token, user.getRole().name());
    }
}