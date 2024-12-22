package com.booking_cinema.controller;

import com.booking_cinema.dto.request.showtime.ShowtimeRequest;
import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import com.booking_cinema.dto.response.showtime.ShowtimeResponse;
import com.booking_cinema.service.showtime.IShowtimeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/showtime")
@Slf4j
@RequiredArgsConstructor
public class ShowtimeController {
    private final IShowtimeService iShowtimeService;

    @GetMapping("/cinema/{cinemaId}")
    public ApiResponse<List<ShowtimeResponse>> getAllWithCinemaId(@PathVariable Long cinemaId){
        return ApiResponse.<List<ShowtimeResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iShowtimeService.getShowtimeWithCinemaId(cinemaId))
                .build();
    }

    @GetMapping("/movie/{movieId}")
    public ApiResponse<List<ShowtimeResponse>> getAllWithMovieId(@PathVariable Long movieId){
        return ApiResponse.<List<ShowtimeResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iShowtimeService.getShowtimeWithMovieId(movieId))
                .build();
    }

    @GetMapping("")
    public ApiResponse<List<ShowtimeResponse>> getShowtimeByCriteria(
            @RequestParam Long cinemaId,
            @RequestParam Long movieId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate showDate
    ){
        return ApiResponse.<List<ShowtimeResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iShowtimeService.getShowtimeByCriteria(cinemaId, movieId, showDate))
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<ShowtimeResponse> createShowtime(@RequestBody @Valid ShowtimeRequest request){
        return ApiResponse.<ShowtimeResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iShowtimeService.createShowtime(request))
                .build();
    }

    @PutMapping("/update/{showtimeId}")
    public ApiResponse<ShowtimeResponse> updateShowtime(@PathVariable Long showtimeId, @RequestBody @Valid ShowtimeRequest request){
        return ApiResponse.<ShowtimeResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iShowtimeService.updateShowtime(showtimeId, request))
                .build();
    }

    @DeleteMapping("/delete/{showtimeId}")
    public String deleteShowtime(@PathVariable Long showtimeId){
        iShowtimeService.deleteShowtime(showtimeId);
        return "deleted showtime with ID= "+showtimeId;
    }
}
