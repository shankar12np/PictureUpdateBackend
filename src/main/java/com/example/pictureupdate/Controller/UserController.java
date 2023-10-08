package com.example.pictureupdate.Controller;

import com.example.pictureupdate.Config.JwtUtil;
import com.example.pictureupdate.Entity.User;
import com.example.pictureupdate.POJO.AuthenticationResponse;
import com.example.pictureupdate.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/login")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            boolean passwordMatches = bCryptPasswordEncoder.matches(user.getPassword(), userDetails.getPassword());

            if (passwordMatches) {
                String jwt = jwtUtil.generateTokenForUser(userDetails);
                return ResponseEntity.ok(new AuthenticationResponse(jwt, "Login successful!"));

            } else {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .header("WWW-Authenticate", "Basic realm=\"Access to the staging site\"")
                        .body("Wrong username or password");
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .header("WWW-Authenticate", "Basic realm=\"Access to the staging site\"")
                    .body("Username not found");
        } catch (Exception e) {
            // handle other unexpected exceptions
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

}

