package com.booking_cinema.service.seat;

import com.booking_cinema.dto.request.seat.SeatUpdateRequest;
import com.booking_cinema.dto.response.seat.SeatResponse;

import java.util.List;

public interface ISeatService {
    List<SeatResponse> getSeatWithRoomId(Long roomId);
    SeatResponse updateSeat(Long seatId, SeatUpdateRequest request);
}
