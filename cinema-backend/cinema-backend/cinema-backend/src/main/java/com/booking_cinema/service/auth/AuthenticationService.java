package com.booking_cinema.service.auth;

import com.booking_cinema.dto.request.auth.AuthenticationRequest;
import com.booking_cinema.dto.request.auth.IntrospectRequest;
import com.booking_cinema.dto.response.auth.AuthenticationResponse;
import com.booking_cinema.dto.response.auth.IntrospectResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.User;
import com.booking_cinema.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService{
    private final UserRepository userRepository;

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Override
    public AuthenticationResponse logIn(AuthenticationRequest request) {
        User existingUser = userRepository.findByUserName(request.getUserName()).orElseThrow(() ->
                new AppException(ErrorCode.USER_NOTFOUND));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if(!passwordEncoder.matches(request.getPassword(), existingUser.getPassword())){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        var token = generateToken(existingUser);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
    private String generateToken(User user){
        //tao token
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUserName())
                .issuer("bacz")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(24, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope", buildScope(user))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        //ki token
        try {
            jwsObject.sign(new MACSigner(secretKey.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user){
        if(user.getRoleId() != null){ // Kiểm tra nếu người dùng có vai trò
            return user.getRoleId().getRoleName(); // Lấy tên vai trò từ đối tượng Role
        }
        return ""; // Trả về chuỗi rỗng nếu người dùng không có vai trò
    }

    @Override
    public IntrospectResponse introspect(IntrospectRequest request) {
        var token = request.getToken();
        try {
            //xác minh chữ kí 'secretKey' có đúng hay không
            JWSVerifier verifier = new MACVerifier(secretKey.getBytes());

            //phân tách token để lấy chữ kí
            SignedJWT signedJWT = SignedJWT.parse(token);

            //ktra tgian hết hạn của token
            Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

            //xác minh chữ kí(so sánh chữ kí trong token với secretKey có khớp hay không)
            var verified = signedJWT.verify(verifier);

            return IntrospectResponse.builder()
                    .valid(verified && expiryTime.after(new Date()))
                    .build();
        } catch (JOSEException | ParseException e) {
            throw new RuntimeException(e);
        }
    }


}
