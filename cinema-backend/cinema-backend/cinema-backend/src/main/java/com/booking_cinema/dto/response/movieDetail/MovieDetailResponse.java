package com.booking_cinema.dto.response.movieDetail;

import com.booking_cinema.model.MovieDetail;
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
public class MovieDetailResponse {
    private Long movieDetailId;
    private String movieDescription;
    private String movieTrailer;
    private String movieGenre;
    private LocalDate releaseDate;
    private String movieLanguage;
    private Long movieId;

    public static MovieDetailResponse toMovieDetailResponse(MovieDetail movieDetail){
        return MovieDetailResponse.builder()
                .movieDetailId(movieDetail.getMovieDetailId())
                .movieDescription(movieDetail.getMovieDescription())
                .movieTrailer(movieDetail.getMovieTrailer())
                .movieGenre(movieDetail.getMovieGenre())
                .releaseDate(movieDetail.getReleaseDate())
                .movieLanguage(movieDetail.getMovieLanguage())
                .movieId(movieDetail.getMovieId().getMovieId())
                .build();
    }
}
