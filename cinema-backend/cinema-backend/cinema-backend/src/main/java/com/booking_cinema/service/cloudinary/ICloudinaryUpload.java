package com.booking_cinema.service.cloudinary;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ICloudinaryUpload {
    String upload(MultipartFile file) throws IOException;
}
