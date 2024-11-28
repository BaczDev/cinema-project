package com.booking_cinema.service.room;

import com.booking_cinema.dto.request.room.RoomRequest;
import com.booking_cinema.dto.response.room.RoomResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Cinema;
import com.booking_cinema.model.Room;
import com.booking_cinema.model.Seat;
import com.booking_cinema.repository.CinemaRepository;
import com.booking_cinema.repository.RoomRepository;
import com.booking_cinema.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService{
    private final RoomRepository roomRepository;
    private final CinemaRepository cinemaRepository;
    private final SeatRepository seatRepository;
    @Override
    public RoomResponse getRoom(Long roomId) {
        Room existingRoom = roomRepository.findById(roomId).orElseThrow(() ->
                new AppException(ErrorCode.ROOM_NOTFOUND));
        RoomResponse roomResponse = RoomResponse.toRoomResponse(existingRoom);
        return roomResponse;
    }

    @Override
    public List<RoomResponse> getRoomWithCinemaId(Long cinemaId) {
        cinemaRepository.findById(cinemaId).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        List<Room> rooms = roomRepository.findAllByCinemaId_CinemaId(cinemaId);
        return rooms.stream()
                .map(room -> new RoomResponse(
                        room.getRoomId(),
                        room.getRoomName(),
                        room.getCinemaId().getCinemaId(),
                        room.getCreatedAt(),
                        room.getUpdatedAt()
                ))
                .toList();
    }

    @Override
    public RoomResponse createRoom(RoomRequest request, int rows, int cols) {
        Cinema existingCinema = cinemaRepository.findById(request.getCinemaId()).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        if(roomRepository.existsByRoomNameAndCinemaId_CinemaId(request.getRoomName(), request.getCinemaId())){
            throw new AppException(ErrorCode.ROOM_EXISTED);
        }
        Room newRoom = new Room();
        newRoom.setRoomName(request.getRoomName());
        newRoom.setCinemaId(existingCinema);

        roomRepository.save(newRoom);

        List<Seat> seats = new ArrayList<>();
        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                Seat seat = new Seat();
                seat.setRowSeat(row);
                seat.setNumber(col);
                if(row < 4){
                    seat.setSeatType("normal");
                }else {
                    seat.setSeatType("vip");
                }
                seat.setSeatStatus("available");
                seat.setRoomId(newRoom);
                seats.add(seat);
            }
        }
        seatRepository.saveAll(seats);

        RoomResponse roomResponse = RoomResponse.toRoomResponse(newRoom);
        return roomResponse;
    }

    @Override
    public RoomResponse updateRoom(Long roomId, RoomRequest request) {
        Room existingRoom = roomRepository.findById(roomId).orElseThrow(() ->
                new AppException(ErrorCode.ROOM_NOTFOUND));
        Cinema existingCinema = cinemaRepository.findById(request.getCinemaId()).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        existingRoom.setRoomName(request.getRoomName());
        existingRoom.setCinemaId(existingCinema);
        roomRepository.save(existingRoom);
        RoomResponse roomResponse = RoomResponse.toRoomResponse(existingRoom);
        return roomResponse;
    }

    @Override
    public void deleteRoom(Long roomId) {
        roomRepository.findById(roomId).orElseThrow(() ->
                new AppException(ErrorCode.ROOM_NOTFOUND));
        roomRepository.deleteById(roomId);
    }
}
