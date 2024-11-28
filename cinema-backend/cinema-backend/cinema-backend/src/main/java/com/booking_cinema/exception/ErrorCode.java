package com.booking_cinema.exception;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_ERROR(9999,"uncategorized error"),
    //user
    USER_NOTFOUND(1000,"user not found"),
    USER_EXISTED(1001,"user existed"),
    USERNAME_INVALID(1002,"username must be at least 5 characters"),
    PASSWORD_INVALID(1003,"password must be at least 6 characters"),
    PHONE_NUMBER_INVALID(1004, "phone number must be at least 10 characters"),
    EMAIL_INCORRECT(1005,"email format is incorrect"),


    //cinema
    CINEMA_NOTFOUND(2000,"cinema not found"),
    CINEMA_EXISTED(2001, "cinema existed"),
    CINEMA_NAME_NOT_BLANK(2002, "cinema name not blank"),
    CINEMA_ADDRESS_NOT_BLANK(2003, "cinema address not blank"),


    //room
    ROOM_NOTFOUND(3000, "room not found"),
    ROOM_EXISTED(3001, "room existed"),
    ROOM_NAME_NOT_BLANK(3002, "room name not blank"),
    CINEMA_ID_NOTNULL(3003, "cinema id not null"),


    //seat
    SEAT_NOTFOUND(4000, "seat not found"),
    SEAT_TYPE_NOTNULL(4001, "seat type is normal or vip"),
    SEAT_NUMBER_NOTNULL(4002, "number is not null"),
    ROW_SEAT_NOTNULL(4003, "row seat is not null"),
    SEAT_STATUS_NOTNULL(4004, "seat status not null"),
    ROOM_ID_NOTNULL(4005, "room id is not null"),

    //movie
    MOVIE_NOTFOUND(5000,"movie not found"),
    MOVIE_EXISTED(5001, "movie existed"),
    MOVIE_NAME_NOT_BLANK(5002,"movie name not blank"),
    MOVIE_LENGTH_NOT_BLANK(5003,"movie length not blank"),

    //movie poster
    FILE_IS_NULL(6000, "file is null"),
    FILE_TOO_LARGE(6001, "File is too large! Maximum size is 10MB"),
    INVALID_FILE_FORMAT(6002, "File must be an image"),
    FILE_UPLOAD_FAILED(6003,"Failed to upload file"),

    ;

    private int errorCode;
    private String errorMessage;
}
