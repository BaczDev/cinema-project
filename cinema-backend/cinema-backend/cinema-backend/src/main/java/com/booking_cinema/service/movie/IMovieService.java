package com.booking_cinema.service.movie;

import com.booking_cinema.dto.request.movie.MovieRequest;
import com.booking_cinema.dto.response.movie.MovieResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IMovieService {
    MovieResponse getMovie(Long movieId);
    List<MovieResponse> getAllMovie();
    MovieResponse createMovie(MovieRequest request);
    String uploadPoster(Long movieId, MultipartFile file);
    MovieResponse updateMovie(Long movieId, MovieRequest request);
    void deleteMovie(Long movieId);
}
