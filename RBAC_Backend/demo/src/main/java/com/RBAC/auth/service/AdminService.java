package com.RBAC.auth.service;

import com.RBAC.auth.dto.UserRequest;
import com.RBAC.auth.dto.UserResponse;
import com.RBAC.auth.entity.Role;
import com.RBAC.auth.entity.User;
import com.RBAC.auth.mapper.UserMapper;
import com.RBAC.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper mapper;

    public UserResponse createUser(UserRequest request) {

        User user = mapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(request.getRole().toUpperCase()));

        return mapper.toResponse(userRepository.save(user));
    }

    public UserResponse updateUser(Long id, UserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));


        mapper.updateUserFromDto(request, user);


        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }


        if (request.getRole() != null) {
            user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        }

        return mapper.toResponse(userRepository.save(user));
    }
}