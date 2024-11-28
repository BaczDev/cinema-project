package com.booking_cinema.dto.response.cinema;

import com.booking_cinema.model.Cinema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CinemaResponse {
    private Long cinemaId;
    private String cinemaName;
    private String cinemaAddress;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static CinemaResponse toCinemaResponse(Cinema cinema){
        return CinemaResponse.builder()
                .cinemaId(cinema.getCinemaId())
                .cinemaName(cinema.getCinemaName())
                .cinemaAddress(cinema.getCinemaAddress())
                .createdAt(cinema.getCreatedAt())
                .updatedAt(cinema.getUpdatedAt())
                .build();
    }
}
