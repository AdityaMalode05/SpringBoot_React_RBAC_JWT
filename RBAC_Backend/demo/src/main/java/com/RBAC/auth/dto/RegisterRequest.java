package com.RBAC.auth.dto;

import com.RBAC.auth.entity.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
