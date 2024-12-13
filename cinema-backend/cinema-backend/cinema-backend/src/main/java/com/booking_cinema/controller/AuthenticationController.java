package com.booking_cinema.controller;

import com.booking_cinema.dto.request.auth.AuthenticationRequest;
import com.booking_cinema.dto.request.auth.IntrospectRequest;
import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import com.booking_cinema.dto.response.auth.AuthenticationResponse;
import com.booking_cinema.dto.response.auth.IntrospectResponse;
import com.booking_cinema.service.auth.IAuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthenticationController {
    private final IAuthenticationService iAuthenticationService;

    @PostMapping("/log-in")
    public ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ApiResponse.<AuthenticationResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iAuthenticationService.logIn(request))
                .build();
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request){
        return ApiResponse.<IntrospectResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iAuthenticationService.introspect(request))
                .build();
    }
}
