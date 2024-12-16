package com.booking_cinema.dto.request.movieDetail;

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
public class MovieDetailRequest {
    @NotNull(message = "MOVIE_DESCRIPTION_NOTNULL")
    private String movieDescription;

    @NotNull(message = "MOVIE_TRAILER_NOTNULL")
    private String movieTrailer;

    @NotNull(message = "MOVIE_GENRE_NOTNULL")
    private String movieGenre;

    @NotNull(message = "RELEASE_DATE_NOTNULL")
    private LocalDate releaseDate;

    @NotNull(message = "MOVIE_LANGUAGE_NOTNULL")
    private String movieLanguage;

    @NotNull(message = "MOVIE_ID_NOTNULL")
    private Long movieId;

    private String director;

    private String cast;

    private String rated;
}
