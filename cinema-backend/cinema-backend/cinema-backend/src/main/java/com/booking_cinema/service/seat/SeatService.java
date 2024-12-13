package com.booking_cinema.service.seat;

import com.booking_cinema.dto.request.seat.SeatUpdateRequest;
import com.booking_cinema.dto.response.seat.SeatResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Room;
import com.booking_cinema.model.Seat;
import com.booking_cinema.repository.RoomRepository;
import com.booking_cinema.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService implements ISeatService{
    private final SeatRepository seatRepository;
    private final RoomRepository roomRepository;

    @Override
    @PreAuthorize("hasRole('USER')")
    public List<SeatResponse> getSeatWithRoomId(Long roomId) {
        roomRepository.findById(roomId).orElseThrow(() ->
                new AppException(ErrorCode.ROOM_NOTFOUND));
        List<Seat> seats = seatRepository.findAllByRoomId_RoomId(roomId);
        return seats.stream()
                .map(seat -> new SeatResponse(
                        seat.getSeatId(),
                        seat.getSeatType(),
                        seat.getNumber(),
                        seat.getRowSeat(),
                        seat.getRoomId().getRoomId(),
                        seat.getCreatedAt(),
                        seat.getUpdatedAt()
                ))
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public SeatResponse updateSeat(Long seatId, SeatUpdateRequest request) {
        Room existingRoom = roomRepository.findById(request.getRoomId()).orElseThrow(() ->
                new AppException(ErrorCode.ROOM_NOTFOUND));
        Seat existingSeat = seatRepository.findById(seatId).orElseThrow(() ->
                new AppException(ErrorCode.SEAT_NOTFOUND));
        existingSeat.setSeatType(request.getSeatType());
        existingSeat.setNumber(request.getNumber());
        existingSeat.setRowSeat(request.getRowSeat());
        existingSeat.setRoomId(existingRoom);
        seatRepository.save(existingSeat);

        SeatResponse seatResponse = SeatResponse.toSeatResponse(existingSeat);
        return seatResponse;
    }
}
