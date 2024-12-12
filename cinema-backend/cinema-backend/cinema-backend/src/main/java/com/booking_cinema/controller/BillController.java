package com.booking_cinema.controller;

import com.booking_cinema.dto.request.bill.BillRequest;
import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import com.booking_cinema.dto.response.bill.BillResponse;
import com.booking_cinema.service.bill.IBillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bill")
@Slf4j
@RequiredArgsConstructor
public class BillController {
    private final IBillService iBillService;

    @PostMapping("/create")
    public ApiResponse<BillResponse> createBill(@RequestBody BillRequest request){
        return ApiResponse.<BillResponse>builder()
                .success(true)
                .errorCode(0)
                .errorMessage("")
                .data(iBillService.createBill(request))
                .build();
    }
}
