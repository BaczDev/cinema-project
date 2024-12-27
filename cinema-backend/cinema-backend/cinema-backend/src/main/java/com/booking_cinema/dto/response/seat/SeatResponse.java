package com.booking_cinema.dto.response.seat;

import com.booking_cinema.model.Seat;
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
    private int price;
    private Long roomId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static SeatResponse toSeatResponse(Seat seat){
        return SeatResponse.builder()
                .seatId(seat.getSeatId())
                .seatType(seat.getSeatType())
                .number(seat.getNumber())
                .rowSeat(seat.getRowSeat())
                .price(seat.getPrice())
                .roomId(seat.getRoomId().getRoomId())
                .createdAt(seat.getCreatedAt())
                .updatedAt(seat.getUpdatedAt())
                .build();
    }
}
