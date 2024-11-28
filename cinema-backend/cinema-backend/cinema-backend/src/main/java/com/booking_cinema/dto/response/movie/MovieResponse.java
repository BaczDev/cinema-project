package com.booking_cinema.dto.response.movie;

import com.booking_cinema.model.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieResponse {
    private Long movieId;
    private String movieName;
    private String moviePosterUrl;
    private String movieLength;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static MovieResponse toMovieResponse(Movie movie){
        return MovieResponse.builder()
                .movieId(movie.getMovieId())
                .movieName(movie.getMovieName())
                .moviePosterUrl(movie.getMoviePosterUrl())
                .movieLength(movie.getMovieLength())
                .createdAt(movie.getCreatedAt())
                .updatedAt(movie.getUpdatedAt())
                .build();
    }
}
