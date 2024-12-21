package com.booking_cinema.service.movieDetail;

import com.booking_cinema.dto.request.movieDetail.MovieDetailRequest;
import com.booking_cinema.dto.request.movieDetail.MovieDetailUpdateRequest;
import com.booking_cinema.dto.response.movieDetail.MovieDetailResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IMovieDetailService {
    List<MovieDetailResponse> getAllMovieDetail();
    MovieDetailResponse getMovieDetailWithMovieId(Long movieId);
    MovieDetailResponse createMovieDetail(MovieDetailRequest request);
    String uploadTrailer(Long movieDetailId, MultipartFile file);
    MovieDetailResponse updateMovieDetail(Long movieDetailId, MovieDetailUpdateRequest request);
    void deleteMovieDetail(Long movieDetailId);

}
