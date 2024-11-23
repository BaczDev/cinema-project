package com.booking_cinema.service.room;

import com.booking_cinema.dto.request.room.RoomRequest;
import com.booking_cinema.dto.response.room.RoomResponse;

import java.util.List;

public interface IRoomService {
    RoomResponse getRoom(Long roomId);
    List<RoomResponse> getRoomWithCinemaId(Long cinemaId);
    RoomResponse createRoom(RoomRequest request, int rows, int cols);
    RoomResponse updateRoom(Long roomId, RoomRequest request);
    void deleteRoom(Long roomId);

}
