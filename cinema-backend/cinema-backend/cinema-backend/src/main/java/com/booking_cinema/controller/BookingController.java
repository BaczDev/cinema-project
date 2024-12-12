package com.booking_cinema.controller;

import com.booking_cinema.dto.request.booking.BookingRequest;
import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import com.booking_cinema.dto.response.booking.BookingResponse;
import com.booking_cinema.service.booking.IBookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/booking")
@Slf4j
@RequiredArgsConstructor
public class BookingController {

    private final IBookingService iBookingService;

    @PostMapping("/create")
    public ApiResponse<List<BookingResponse>> createBooking(@RequestBody @Valid BookingRequest request){
        return ApiResponse.<List<BookingResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iBookingService.createBooking(request))
                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<BookingResponse>> getAllWithUserId(@PathVariable Long userId){
        return ApiResponse.<List<BookingResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iBookingService.getBookingWithUserId(userId))
                .build();
    }
}
