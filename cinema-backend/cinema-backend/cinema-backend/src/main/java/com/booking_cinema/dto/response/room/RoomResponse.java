package com.booking_cinema.dto.response.room;

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
}
