package com.booking_cinema.controller;

import com.booking_cinema.dto.request.movieDetail.MovieDetailRequest;
import com.booking_cinema.dto.request.movieDetail.MovieDetailUpdateRequest;
import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import com.booking_cinema.dto.response.movieDetail.MovieDetailResponse;
import com.booking_cinema.service.movieDetail.IMovieDetailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/movieDetail")
@Slf4j
@RequiredArgsConstructor
public class MovieDetailController {
    private final IMovieDetailService iMovieDetailService;

    @GetMapping("")
    public ApiResponse<List<MovieDetailResponse>> getAllMovieDetail(){
        return ApiResponse.<List<MovieDetailResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieDetailService.getAllMovieDetail())
                .build();
    }

    @GetMapping("/movie/{movieId}")
    public ApiResponse<MovieDetailResponse> getMovieDetailWithMovieId(@PathVariable Long movieId){
        return ApiResponse.<MovieDetailResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieDetailService.getMovieDetailWithMovieId(movieId))
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<MovieDetailResponse> createMovieDetail(@RequestBody @Valid MovieDetailRequest request){
        return ApiResponse.<MovieDetailResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieDetailService.createMovieDetail(request))
                .build();
    }

    @PostMapping("/upload-trailer/{movieDetailId}")
    public ApiResponse<String> uploadTrailer(@PathVariable Long movieDetailId, @RequestParam("files")MultipartFile file){
        return ApiResponse.<String>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieDetailService.uploadTrailer(movieDetailId, file))
                .build();
    }

    @PutMapping("/update/{movieDetailId}")
    public ApiResponse<MovieDetailResponse> updateMovieDetail(@PathVariable Long movieDetailId, @RequestBody @Valid MovieDetailUpdateRequest request){
        return ApiResponse.<MovieDetailResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieDetailService.updateMovieDetail(movieDetailId, request))
                .build();
    }

    @DeleteMapping("/delete/{movieDetailId}")
    public String deleteMovieDetail(@PathVariable Long movieDetailId){
        iMovieDetailService.deleteMovieDetail(movieDetailId);
        return "deleted movie detail with ID= "+ movieDetailId;
    }
}
