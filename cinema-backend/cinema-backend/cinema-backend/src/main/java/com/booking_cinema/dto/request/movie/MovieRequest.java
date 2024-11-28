package com.booking_cinema.dto.request.movie;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieRequest {
    @NotBlank(message = "MOVIE_NAME_NOT_BLANK")
    private String movieName;
    private String moviePosterUrl;
    @NotBlank(message = "MOVIE_LENGTH_NOT_BLANK")
    private String movieLength;
}
