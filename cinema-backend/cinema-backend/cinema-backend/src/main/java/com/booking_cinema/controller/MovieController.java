package com.booking_cinema.controller;

import com.booking_cinema.dto.request.movie.MovieRequest;
import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import com.booking_cinema.dto.response.movie.MovieResponse;
import com.booking_cinema.service.movie.IMovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/movie")
@Slf4j
@RequiredArgsConstructor
public class MovieController {
    private final IMovieService iMovieService;
    @GetMapping("")
    public ApiResponse<List<MovieResponse>> getAllMovie(){
        return ApiResponse.<List<MovieResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieService.getAllMovie())
                .build();
    }

    @GetMapping("/{movieId}")
    public ApiResponse<MovieResponse> getMovieById(@PathVariable @Valid Long movieId){
        return ApiResponse.<MovieResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieService.getMovie(movieId))
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<MovieResponse> createMovie(@RequestBody @Valid MovieRequest request){
        return ApiResponse.<MovieResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieService.createMovie(request))
                .build();
    }

    @PostMapping("/upload-poster/{movieId}")
    public ApiResponse<String> uploadPoster(@PathVariable Long movieId, @RequestParam("files") MultipartFile file){
        return ApiResponse.<String>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieService.uploadPoster(movieId, file))
                .build();
    }

    @PutMapping("/update/{movieId}")
    public ApiResponse<MovieResponse> updateMovie(@PathVariable Long movieId, @RequestBody @Valid MovieRequest request){
        return ApiResponse.<MovieResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iMovieService.updateMovie(movieId, request))
                .build();
    }

    @DeleteMapping("/delete/{movieId}")
    public String deleteMovie(@PathVariable Long movieId){
        iMovieService.deleteMovie(movieId);
        return "deleted with movie with Id= "+movieId;
    }
}
