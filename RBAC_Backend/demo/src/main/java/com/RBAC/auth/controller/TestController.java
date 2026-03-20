package com.RBAC.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/public")
    public String publicApi() {
        return "Public API";
    }

    @GetMapping("/api/user")
    public String userApi() {
        return "User API";
    }

    @GetMapping("/api/admin")
    public String adminApi() {
        return "Admin API";
    }
}