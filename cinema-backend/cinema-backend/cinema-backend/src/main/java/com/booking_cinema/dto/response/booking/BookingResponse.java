package com.booking_cinema.dto.response.booking;

import com.booking_cinema.model.Booking;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long bookingId;
    private float price;
    private Long userId;
    private Long cinemaId;
    private Long movieId;
    private Long seatId;
    private Long showtimeId;

    public static BookingResponse toBookingResponse(Booking booking){
        return BookingResponse.builder()
                .bookingId(booking.getBookingId())
                .price(booking.getPrice())
                .userId(booking.getUserId().getUserId())
                .cinemaId(booking.getCinemaId().getCinemaId())
                .movieId(booking.getMovieId().getMovieId())
                .seatId(booking.getSeatId().getSeatId())
                .showtimeId(booking.getShowtimeId().getShowtimeId())
                .build();
    }
}
