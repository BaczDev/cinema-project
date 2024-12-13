package com.booking_cinema.exception;

import com.booking_cinema.dto.response.apiResponse.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    //handle app exception
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException e){
        ErrorCode errorCode = e.getErrorCode();
        ApiResponse apiResponse = new ApiResponse<>();
        apiResponse.setSuccess(false);
        apiResponse.setErrorCode(errorCode.getErrorCode());
        apiResponse.setErrorMessage(errorCode.getErrorMessage());
        apiResponse.setData(null);
        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);
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

    //handling AccessDeniedException
    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(org.springframework.security.access.AccessDeniedException e){
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        return ResponseEntity.status(errorCode.getStatusCode()).body(
                ApiResponse.builder()
                        .success(false)
                        .errorCode(errorCode.getErrorCode())
                        .errorMessage(errorCode.getErrorMessage())
                        .data(null)
                        .build()
        );
    }
}
