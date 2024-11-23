package com.booking_cinema.repository;

import com.booking_cinema.dto.response.room.RoomResponse;
import com.booking_cinema.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    boolean existsByRoomName(String roomName);
    boolean existsByRoomNameAndCinemaId_CinemaId(String roomName, Long cinemaId);
    List<Room> findAllByCinemaId_CinemaId(Long cinemaId);
}
