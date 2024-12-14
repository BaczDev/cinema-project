package com.booking_cinema.service.auth;

import com.booking_cinema.dto.request.auth.AuthenticationRequest;
import com.booking_cinema.dto.request.auth.IntrospectRequest;
import com.booking_cinema.dto.request.auth.LogoutRequest;
import com.booking_cinema.dto.response.auth.AuthenticationResponse;
import com.booking_cinema.dto.response.auth.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface IAuthenticationService {
    AuthenticationResponse logIn(AuthenticationRequest request);

    IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;

    void logout(LogoutRequest request) throws ParseException, JOSEException;
}
