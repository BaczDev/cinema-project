package com.booking_cinema.exception;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_ERROR(999,"uncategorized error"),
    //user
    USER_NOTFOUND(100,"user not found"),
    USER_EXISTED(101,"user existed"),
    USERNAME_INVALID(102,"username must be at least 5 characters"),
    PASSWORD_INVALID(103,"password must be at least 6 characters"),
    PHONE_NUMBER_INVALID(104, "phone number must be at least 10 characters"),
    EMAIL_INCORRECT(105,"email format is incorrect"),


    //cinema
    CINEMA_NOTFOUND(200,"cinema not found"),
    CINEMA_EXISTED(201, "cinema existed"),
    CINEMA_NAME_NOT_BLANK(202, "cinema name not blank"),
    CINEMA_ADDRESS_NOT_BLANK(203, "cinema address not blank"),


    //room
    ROOM_NOTFOUND(300, "room not found"),
    ROOM_EXISTED(301, "room existed"),
    ROOM_NAME_NOT_BLANK(302, "room name not blank"),
    CINEMA_ID_NOTNULL(303, "cinema id not null"),


    //seat
    SEAT_NOTFOUND(400, "seat not found"),
    SEAT_TYPE_NOTNULL(401, "seat type is normal or vip"),
    SEAT_NUMBER_NOTNULL(402, "number is not null"),
    ROW_SEAT_NOTNULL(403, "row seat is not null"),
    ROOM_ID_NOTNULL(405, "room id is not null"),

    //movie
    MOVIE_NOTFOUND(500,"movie not found"),
    MOVIE_EXISTED(501, "movie existed"),
    MOVIE_NAME_NOT_BLANK(502,"movie name not blank"),
    MOVIE_LENGTH_NOT_BLANK(503,"movie length not blank"),

    //movie poster
    FILE_IS_NULL(600, "file is null"),
    FILE_TOO_LARGE(601, "File is too large! Maximum size is 10MB"),
    INVALID_FILE_FORMAT(602, "File must be an image"),
    FILE_UPLOAD_FAILED(603,"Failed to upload file"),


    //showtime
    SHOWTIME_NOTFOUND(700, "showtime not found"),
    SHOWTIME_EXISTED(701, "showtime existed"),
    SHOWTIME_NOTNULL(702, "showtime not null"),
    START_TIME_NOTNULL(703, "start time not null"),
    END_TIME_NOTNULL(704, "end time not null"),
    MOVIE_ID_NOTNULL(705, "movie id not null"),

    //movie detail
    MOVIE_DETAIL_NOTFOUND(800, "movie detail not found"),
    MOVIE_DETAIL_EXISTED(801, "movie detail with movie existed"),
    VIDEO_TOO_LARGE(802, "Video is too large! Maximum size is 100MB"),
    INVALID_VIDEO_FORMAT(803, "File must be an video"),

    MOVIE_DESCRIPTION_NOTNULL(804, "movie description not null"),
    MOVIE_TRAILER_NOTNULL(804, "movie trailer not null"),
    MOVIE_GENRE_NOTNULL(804, "movie genre not null"),
    RELEASE_DATE_NOTNULL(804, "release date not null"),
    MOVIE_LANGUAGE_NOTNULL(804, "movie language not null"),

    //booking
    BOOKING_NOTFOUND(900, "booking not found"),
    SEAT_BOOKED(901, "The seat has been booked."),
    PRICE_NOTNULL(902, "price not null"),
    USER_ID_NOTNULL(903, "user id not null"),
    SEAT_ID_NOTNULL(904, "seat id not null"),
    SHOWTIME_ID_NOTNULL(905, "showtime id not null"),

    //bill
    BOOKING_ID_NOTFOUND(1000, "booking id not found"),
    ;

    private int errorCode;
    private String errorMessage;
}
