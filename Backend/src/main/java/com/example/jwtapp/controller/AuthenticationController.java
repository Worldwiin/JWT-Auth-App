package com.example.jwtapp.controller;

import com.example.jwtapp.entity.User;
import com.example.jwtapp.service.UserService;
import com.example.jwtapp.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthenticationController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        userService.register(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        System.out.println("Attempting to login: " + user.getUsername());

        User registeredUser = userService.findByUsername(user.getUsername());
        if (registeredUser != null && new BCryptPasswordEncoder().matches(user.getPassword(), registeredUser.getPassword())) {

            System.out.println("User authenticated successfully!");

            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(token);
        }

        System.out.println("Invalid credentials for user: " + user.getUsername());
        return ResponseEntity.status(401).body("Invalid credentials");
    }

}
