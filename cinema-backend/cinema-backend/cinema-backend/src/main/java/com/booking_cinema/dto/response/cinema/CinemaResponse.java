package com.booking_cinema.dto.response.cinema;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CinemaResponse {
    private Long cinemaId;
    private String cinemaName;
    private String cinemaAddress;
}
