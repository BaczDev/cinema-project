package com.booking_cinema.dto.response.room;

import com.booking_cinema.model.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {
    private Long roomId;
    private String roomName;
    private Long cinemaId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static RoomResponse toRoomResponse(Room room){
        return RoomResponse.builder()
                .roomId(room.getRoomId())
                .roomName(room.getRoomName())
                .cinemaId(room.getCinemaId().getCinemaId())
                .createdAt(room.getCreatedAt())
                .updatedAt(room.getUpdatedAt())
                .build();
    }
}
