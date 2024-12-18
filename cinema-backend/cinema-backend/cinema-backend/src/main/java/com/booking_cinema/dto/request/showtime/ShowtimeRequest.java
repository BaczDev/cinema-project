package com.booking_cinema.dto.request.showtime;

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
public class ShowtimeRequest {
    @NotNull(message = "SHOWTIME_NOTNULL")
    private LocalDate showDate;

    @NotNull(message = "START_TIME_NOTNULL")
    private String startTime;

    @NotNull(message = "END_TIME_NOTNULL")
    private String endTime;

    @NotNull(message = "MOVIE_ID_NOTNULL")
    private Long movieId;

    @NotNull(message = "CINEMA_ID_NOTNULL")
    private Long cinemaId;

    private Long roomId;
}
