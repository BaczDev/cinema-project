package com.booking_cinema.exception;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_ERROR(9999,"uncategorized error"),
    USER_NOTFOUND(1000,"user not found"),
    USER_EXISTED(1001,"user existed"),
    USERNAME_INVALID(1002,"username must be at least 5 characters"),
    PASSWORD_INVALID(1003,"password must be at least 6 characters"),
    PHONE_NUMBER_INVALID(1004, "phone number must be at least 10 characters"),
    EMAIL_INCORRECT(1005,"email format is incorrect")
    ;

    private int errorCode;
    private String errorMessage;
}
