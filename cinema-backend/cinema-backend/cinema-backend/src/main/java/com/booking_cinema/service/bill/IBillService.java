package com.booking_cinema.service.bill;

import com.booking_cinema.dto.request.bill.BillRequest;
import com.booking_cinema.dto.response.bill.BillResponse;


public interface IBillService {
    BillResponse createBill(BillRequest request);
}
