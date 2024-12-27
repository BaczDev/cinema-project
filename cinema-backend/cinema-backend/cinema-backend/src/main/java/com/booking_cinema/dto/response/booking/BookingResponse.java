package com.booking_cinema.dto.response.booking;

import com.booking_cinema.model.Booking;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long bookingId;
    private Long userId;
    private Long seatId;
    private String cinemaName;
    private String movieName;
    private int rowSeat;
    private int number;
    private String startTime;
    private LocalDate showDate;
    private String roomName;

    public static BookingResponse toBookingResponse(Booking booking){
        return BookingResponse.builder()
                .bookingId(booking.getBookingId())
                .userId(booking.getUserId().getUserId())
                .seatId(booking.getSeatId().getSeatId())
                .cinemaName(booking.getCinemaId().getCinemaName())
                .movieName(booking.getMovieId().getMovieName())
                .rowSeat(booking.getSeatId().getRowSeat())
                .number(booking.getSeatId().getNumber())
                .startTime(booking.getShowtimeId().getStartTime())
                .showDate(booking.getShowtimeId().getShowDate())
                .roomName(booking.getSeatId().getRoomId().getRoomName())
                .build();
    }
}
