package com.booking_cinema.dto.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCreationRequest {
    @NotNull
    @Size(min = 5, message = "USERNAME_INVALID")
    private String userName;

    @NotNull
    @Size(min = 6, message = "PASSWORD_INVALID")
    private String password;

    @Email(message = "EMAIL_INCORRECT")
    private String email;

    @NotNull
    @Size(min = 10, message = "PHONE_NUMBER_INVALID")
    private String phoneNumber;
}
