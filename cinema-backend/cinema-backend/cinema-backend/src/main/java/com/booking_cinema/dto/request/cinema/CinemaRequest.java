package com.booking_cinema.dto.request.cinema;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CinemaRequest {
    @NotNull(message = "CINEMA_NAME_NOTNULL")
    private String cinemaName;

    @NotNull(message = "CINEMA_ADDRESS_NOTNULL")
    private String cinemaAddress;
}
