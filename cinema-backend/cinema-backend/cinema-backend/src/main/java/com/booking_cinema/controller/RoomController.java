package com.booking_cinema.controller;

import com.booking_cinema.dto.request.room.RoomRequest;
import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import com.booking_cinema.dto.response.room.RoomResponse;
import com.booking_cinema.service.room.IRoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/room")
@Slf4j
@RequiredArgsConstructor
public class RoomController {
    private final IRoomService iRoomService;

    @GetMapping("/cinema/{cinemaId}")
    public ApiResponse<List<RoomResponse>> getRoomWithCinemaId(@PathVariable Long cinemaId){
        return ApiResponse.<List<RoomResponse>>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iRoomService.getRoomWithCinemaId(cinemaId))
                .build();
    }
    @GetMapping("/{roomId}")
    public ApiResponse<RoomResponse> getRoom(@PathVariable Long roomId){
        return ApiResponse.<RoomResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iRoomService.getRoom(roomId))
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<RoomResponse> createRoom(@RequestBody @Valid RoomRequest request,
                                                @RequestParam(defaultValue = "10") int rows,
                                                @RequestParam(defaultValue = "10") int cols){
        return ApiResponse.<RoomResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iRoomService.createRoom(request, rows, cols))
                .build();
    }

    @PutMapping("/update/{roomId}")
    public ApiResponse<RoomResponse> updateRoom(@PathVariable Long roomId, @RequestBody @Valid RoomRequest request){
        return ApiResponse.<RoomResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iRoomService.updateRoom(roomId, request))
                .build();
    }

    @DeleteMapping("/delete/{roomId}")
    public String deleteRoom(@PathVariable Long roomId){
        iRoomService.deleteRoom(roomId);
        return "deleted room with ID= "+roomId;
    }
}
