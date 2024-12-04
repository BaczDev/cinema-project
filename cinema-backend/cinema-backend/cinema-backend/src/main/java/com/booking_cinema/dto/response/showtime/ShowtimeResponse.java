package com.booking_cinema.dto.response.showtime;

import com.booking_cinema.model.ShowTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShowtimeResponse {
    private Long showtimeId;
    private LocalDate showDate;
    private String startTime;
    private String endTime;
    private Long movieId;
    private Long cinemaId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ShowtimeResponse toShowtimeResponse(ShowTime showTime){
        return ShowtimeResponse.builder()
                .showtimeId(showTime.getShowtimeId())
                .showDate(showTime.getShowDate())
                .startTime(showTime.getStartTime())
                .endTime(showTime.getEndTime())
                .movieId(showTime.getMovieId().getMovieId())
                .cinemaId(showTime.getCinemaId().getCinemaId())
                .createdAt(showTime.getCreatedAt())
                .updatedAt(showTime.getUpdatedAt())
                .build();
    }
}
