package com.booking_cinema.exception;

import com.booking_cinema.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    //handle runtime exception
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException e){
        ApiResponse apiResponse = new ApiResponse<>();
        apiResponse.setSuccess(false);
        apiResponse.setErrorCode(ErrorCode.UNCATEGORIZED_ERROR.getErrorCode());
        apiResponse.setErrorMessage(ErrorCode.UNCATEGORIZED_ERROR.getErrorMessage());
        apiResponse.setData(null);
        return ResponseEntity.badRequest().body(apiResponse);
    }


    //handle app exception
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException e){
        ErrorCode errorCode = e.getErrorCode();
        ApiResponse apiResponse = new ApiResponse<>();
        apiResponse.setSuccess(false);
        apiResponse.setErrorCode(errorCode.getErrorCode());
        apiResponse.setErrorMessage(errorCode.getErrorMessage());
        apiResponse.setData(null);
        return ResponseEntity.badRequest().body(apiResponse);
    }


    //handle validation
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException e){
        String enumKey = e.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.valueOf(enumKey);
        ApiResponse apiResponse = new ApiResponse<>();
        apiResponse.setSuccess(false);
        apiResponse.setErrorCode(errorCode.getErrorCode());
        apiResponse.setErrorMessage(errorCode.getErrorMessage());
        apiResponse.setData(null);
        return ResponseEntity.badRequest().body(apiResponse);
    }
}
