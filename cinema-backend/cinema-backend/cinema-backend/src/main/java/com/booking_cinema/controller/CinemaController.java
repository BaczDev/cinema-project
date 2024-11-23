package com.booking_cinema.controller;

import com.booking_cinema.dto.request.cinema.CinemaRequest;
import com.booking_cinema.dto.response.ApiResponse;
import com.booking_cinema.dto.response.cinema.CinemaResponse;
import com.booking_cinema.model.Cinema;
import com.booking_cinema.service.cinema.ICinemaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cinema")
@Slf4j
@RequiredArgsConstructor
public class CinemaController {
    private final ICinemaService iCinemaService;

    @GetMapping("")
    public ApiResponse<List<CinemaResponse>> getAllCinemas(){
        return ApiResponse.<List<CinemaResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iCinemaService.getAllCinemas())
                .build();
    }

    @GetMapping("/{cinemaId}")
    public ApiResponse<CinemaResponse> getCinema(@PathVariable Long cinemaId){
        return ApiResponse.<CinemaResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iCinemaService.getCinema(cinemaId))
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<Cinema> createCinema(@RequestBody @Valid CinemaRequest request){
        return ApiResponse.<Cinema>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iCinemaService.createCinema(request))
                .build();
    }

    @PutMapping("/update/{cinemaId}")
    public ApiResponse<CinemaResponse> updateCinema(@PathVariable Long cinemaId, @RequestBody @Valid CinemaRequest request){
        return ApiResponse.<CinemaResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iCinemaService.updateCinema(cinemaId, request))
                .build();
    }

    @DeleteMapping("delete/{cinemaId}")
    public String deleteCinema(@PathVariable Long cinemaId){
        iCinemaService.deleteCinema(cinemaId);
        return "deleted cinema with ID= "+cinemaId;
    }
}
