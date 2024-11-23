package com.booking_cinema.dto.response.seat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatResponse {
    private Long seatId;
    private String seatType;
    private int number;
    private int rowSeat;
    private String seatStatus;
    private Long roomId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
