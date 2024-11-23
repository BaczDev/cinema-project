package com.booking_cinema.controller;

import com.booking_cinema.dto.request.seat.SeatUpdateRequest;
import com.booking_cinema.dto.response.ApiResponse;
import com.booking_cinema.dto.response.seat.SeatResponse;
import com.booking_cinema.service.seat.ISeatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/v1/seat")
@Slf4j
@RequiredArgsConstructor
public class SeatController {
    private final ISeatService iSeatService;
    @GetMapping("/room/{roomId}")
    public ApiResponse<List<SeatResponse>> getSeatWithRoomId(@PathVariable Long roomId){
        return ApiResponse.<List<SeatResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iSeatService.getSeatWithRoomId(roomId))
                .build();
    }

    @PutMapping("/update/{seatId}")
    public ApiResponse<SeatResponse> updateSeat(@PathVariable Long seatId, @RequestBody @Valid SeatUpdateRequest request){
        return ApiResponse.<SeatResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iSeatService.updateSeat(seatId, request))
                .build();
    }
}
