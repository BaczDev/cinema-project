package com.booking_cinema.dto.request.booking;

import com.booking_cinema.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {
    @NotNull(message = "PRICE_NOTNULL")
    private float price;

    private float totalMoney;

    @NotNull(message = "USER_ID_NOTNULL")
    private Long userId;

    @NotNull(message = "CINEMA_ID_NOTNULL")
    private Long cinemaId;

    @NotNull(message = "MOVIE_ID_NOTNULL")
    private Long movieId;

    @NotNull(message = "SEAT_ID_NOTNULL")
    private List<Long> seatId;

    @NotNull(message = "SHOWTIME_ID_NOTNULL")
    private Long showtimeId;
}
