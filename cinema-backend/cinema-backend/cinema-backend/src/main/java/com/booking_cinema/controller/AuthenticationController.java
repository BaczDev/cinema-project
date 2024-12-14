package com.booking_cinema.controller;

import com.booking_cinema.dto.request.auth.AuthenticationRequest;
import com.booking_cinema.dto.request.auth.IntrospectRequest;
import com.booking_cinema.dto.request.auth.LogoutRequest;
import com.booking_cinema.dto.request.auth.RefreshRequest;
import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import com.booking_cinema.dto.response.auth.AuthenticationResponse;
import com.booking_cinema.dto.response.auth.IntrospectResponse;
import com.booking_cinema.service.auth.IAuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

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
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        return ApiResponse.<IntrospectResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iAuthenticationService.introspect(request))
                .build();
    }

    @PostMapping("/log-out")
    public ApiResponse<Void> logOut(@RequestBody LogoutRequest request)
            throws ParseException, JOSEException {
        iAuthenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refreshToken(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        return ApiResponse.<AuthenticationResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iAuthenticationService.refreshToken(request))
                .build();
    }
}
