package com.booking_cinema.service.bill;

import com.booking_cinema.dto.request.bill.BillRequest;
import com.booking_cinema.dto.response.bill.BillResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Bill;
import com.booking_cinema.model.Booking;
import com.booking_cinema.model.User;
import com.booking_cinema.repository.BillRepository;
import com.booking_cinema.repository.BookingRepository;
import com.booking_cinema.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BillService implements IBillService{
    private final UserRepository userRepository;
    private final BillRepository billRepository;
    private final BookingRepository bookingRepository;
    @Override
    @Transactional
    public BillResponse createBill(BillRequest request) {
        User existingUser = userRepository.findById(request.getUserId()).orElseThrow(() ->
                new AppException(ErrorCode.USER_NOTFOUND));

        List<Booking> bookings = bookingRepository.findAllById(request.getBookingIds());
        if (bookings.size() != request.getBookingIds().size()){
            throw new AppException(ErrorCode.BOOKING_ID_NOTFOUND);
        }

        float totalMoney = bookings.stream()
                                   .map(Booking::getPrice)
                                   .reduce(0.0f, Float::sum);
        Bill newBill = Bill.builder()
                .userId(existingUser)
                .totalMoney(totalMoney)
                .build();
        Bill saveBill = billRepository.save(newBill);

        BillResponse billResponse = new BillResponse();
        billResponse.setBillId(saveBill.getBillId());
        billResponse.setUserId(saveBill.getUserId().getUserId());
        billResponse.setTotalMoney(saveBill.getTotalMoney());
        billResponse.setBookingIds(bookings.stream()
                                           .map(Booking::getBookingId)
                                           .toList());
        billResponse.setCreatedAt(saveBill.getCreatedAt());
        return billResponse;
    }
}
