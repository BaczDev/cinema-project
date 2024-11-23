package com.booking_cinema.dto.request.cinema;

import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "CINEMA_NAME_NOT_BLANK")
    private String cinemaName;

    @NotBlank(message = "CINEMA_ADDRESS_NOT_BLANK")
    private String cinemaAddress;
}
