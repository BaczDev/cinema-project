package com.booking_cinema.service.auth;

import com.booking_cinema.dto.request.auth.AuthenticationRequest;
import com.booking_cinema.dto.request.auth.IntrospectRequest;
import com.booking_cinema.dto.response.auth.AuthenticationResponse;
import com.booking_cinema.dto.response.auth.IntrospectResponse;

public interface IAuthenticationService {
    AuthenticationResponse logIn(AuthenticationRequest request);

    IntrospectResponse introspect(IntrospectRequest request);
}
