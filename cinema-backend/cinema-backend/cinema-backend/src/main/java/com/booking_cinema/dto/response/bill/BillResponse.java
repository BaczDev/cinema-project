package com.booking_cinema.dto.response.bill;

import com.booking_cinema.model.Booking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillResponse {
    private Long billId;
    private float totalMoney;
    private LocalDateTime createdAt;
    private Long userId;
    private List<Long> bookingIds;
}
