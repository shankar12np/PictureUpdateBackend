package com.example.pictureupdate.POJO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private String jwt;
    private String message;

    public AuthenticationResponse(String jwt) {
    }
}