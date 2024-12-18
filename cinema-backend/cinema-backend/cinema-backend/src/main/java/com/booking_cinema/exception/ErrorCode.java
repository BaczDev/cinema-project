package com.booking_cinema.exception;

import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_ERROR(999,"uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),

    //user
    USER_NOTFOUND(100,"user not found", HttpStatus.NOT_FOUND),
    USER_EXISTED(101,"user existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(102,"username must be at least 5 characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(103,"password must be at least 6 characters", HttpStatus.BAD_REQUEST),
    PHONE_NUMBER_INVALID(104, "phone number must be at least 10 characters", HttpStatus.BAD_REQUEST),
    EMAIL_INCORRECT(105,"email format is incorrect", HttpStatus.BAD_REQUEST),
    ROLE_NOTFOUND(106, "role not found", HttpStatus.NOT_FOUND),


    //cinema
    CINEMA_NOTFOUND(200,"cinema not found", HttpStatus.NOT_FOUND),
    CINEMA_EXISTED(201, "cinema existed", HttpStatus.BAD_REQUEST),
    CINEMA_NAME_NOT_BLANK(202, "cinema name not blank", HttpStatus.BAD_REQUEST),
    CINEMA_ADDRESS_NOT_BLANK(203, "cinema address not blank", HttpStatus.BAD_REQUEST),


    //room
    ROOM_NOTFOUND(300, "room not found", HttpStatus.NOT_FOUND),
    ROOM_EXISTED(301, "room existed", HttpStatus.BAD_REQUEST),
    ROOM_NAME_NOT_BLANK(302, "room name not blank", HttpStatus.BAD_REQUEST),
    CINEMA_ID_NOTNULL(303, "cinema id not null", HttpStatus.BAD_REQUEST),


    //seat
    SEAT_NOTFOUND(400, "seat not found", HttpStatus.NOT_FOUND),
    SEAT_TYPE_NOTNULL(401, "seat type is normal or vip", HttpStatus.BAD_REQUEST),
    SEAT_NUMBER_NOTNULL(402, "number is not null", HttpStatus.BAD_REQUEST),
    ROW_SEAT_NOTNULL(403, "row seat is not null", HttpStatus.BAD_REQUEST),
    ROOM_ID_NOTNULL(405, "room id is not null", HttpStatus.BAD_REQUEST),

    //movie
    MOVIE_NOTFOUND(500,"movie not found", HttpStatus.NOT_FOUND),
    MOVIE_EXISTED(501, "movie existed", HttpStatus.BAD_REQUEST),
    MOVIE_NAME_NOT_BLANK(502,"movie name not blank", HttpStatus.BAD_REQUEST),
    MOVIE_LENGTH_NOT_BLANK(503,"movie length not blank", HttpStatus.BAD_REQUEST),

    //movie poster
    FILE_IS_NULL(600, "file is null", HttpStatus.BAD_REQUEST),
    FILE_TOO_LARGE(601, "File is too large! Maximum size is 10MB", HttpStatus.BAD_REQUEST),
    INVALID_FILE_FORMAT(602, "File must be an image", HttpStatus.BAD_REQUEST),
    FILE_UPLOAD_FAILED(603,"Failed to upload file", HttpStatus.BAD_REQUEST),


    //showtime
    SHOWTIME_NOTFOUND(700, "showtime not found", HttpStatus.NOT_FOUND),
    SHOWTIME_EXISTED(701, "showtime existed", HttpStatus.BAD_REQUEST),
    SHOWTIME_NOTNULL(702, "showtime not null", HttpStatus.BAD_REQUEST),
    START_TIME_NOTNULL(703, "start time not null", HttpStatus.BAD_REQUEST),
    END_TIME_NOTNULL(704, "end time not null", HttpStatus.BAD_REQUEST),
    MOVIE_ID_NOTNULL(705, "movie id not null", HttpStatus.BAD_REQUEST),
    ROOM_NOT_IN_CINEMA(706, "room not in cinema", HttpStatus.NOT_FOUND),
    SHOWTIME_CONFLICT(707, "duplicate showtime", HttpStatus.BAD_REQUEST),

    //movie detail
    MOVIE_DETAIL_NOTFOUND(800, "movie detail not found", HttpStatus.NOT_FOUND),
    MOVIE_DETAIL_EXISTED(801, "movie detail with movie existed", HttpStatus.BAD_REQUEST),
    VIDEO_TOO_LARGE(802, "Video is too large! Maximum size is 100MB", HttpStatus.BAD_REQUEST),
    INVALID_VIDEO_FORMAT(803, "File must be an video", HttpStatus.BAD_REQUEST),

    MOVIE_DESCRIPTION_NOTNULL(804, "movie description not null", HttpStatus.BAD_REQUEST),
    MOVIE_TRAILER_NOTNULL(804, "movie trailer not null", HttpStatus.BAD_REQUEST),
    MOVIE_GENRE_NOTNULL(804, "movie genre not null", HttpStatus.BAD_REQUEST),
    RELEASE_DATE_NOTNULL(804, "release date not null", HttpStatus.BAD_REQUEST),
    MOVIE_LANGUAGE_NOTNULL(804, "movie language not null", HttpStatus.BAD_REQUEST),

    //booking
    BOOKING_NOTFOUND(900, "booking not found", HttpStatus.NOT_FOUND),
    SEAT_BOOKED(901, "The seat has been booked.", HttpStatus.BAD_REQUEST),
    PRICE_NOTNULL(902, "price not null", HttpStatus.BAD_REQUEST),
    USER_ID_NOTNULL(903, "user id not null", HttpStatus.BAD_REQUEST),
    SEAT_ID_NOTNULL(904, "seat id not null", HttpStatus.BAD_REQUEST),
    SHOWTIME_ID_NOTNULL(905, "showtime id not null", HttpStatus.BAD_REQUEST),
    SHOWTIME_NOT_MATCH_MOVIE(906, "This movie does not have a release date yet", HttpStatus.BAD_REQUEST),
    SHOWTIME_NOT_MATCH_CINEMA(907, "This cinema does not have this showtime", HttpStatus.BAD_REQUEST),

    //bill
    BOOKING_ID_NOTFOUND(1000, "booking id not found", HttpStatus.NOT_FOUND),

    //auth
    UNAUTHENTICATED(2000, "unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(2001, "you do not have permission", HttpStatus.FORBIDDEN),
    ;

    private int errorCode;
    private String errorMessage;
    private HttpStatusCode statusCode;
}
