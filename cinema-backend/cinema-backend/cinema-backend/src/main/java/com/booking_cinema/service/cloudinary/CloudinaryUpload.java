package com.booking_cinema.service.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CloudinaryUpload implements ICloudinaryUpload{

    private final Cloudinary cloudinary;

    @Override
    public String upload(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        String publicValue = generatePublicValue(file.getOriginalFilename());
        String extension = getFileName(file.getOriginalFilename())[1];
        File fileUpload = convert(file);
        String resourceType = getResourceType(file);
        cloudinary.uploader().upload(fileUpload, ObjectUtils.asMap("public_id", publicValue,
                                                                          "resource_type", resourceType));
        cleanDisk(fileUpload);
        return cloudinary.url().resourceType(resourceType).generate(StringUtils.join(publicValue, ".", extension));
    }

    private File convert(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        File convFile = new File(StringUtils.join(generatePublicValue(file.getOriginalFilename()), getFileName(file.getOriginalFilename())[1]));
        try(InputStream is = file.getInputStream()) {
            Files.copy(is, convFile.toPath());
        }
        return convFile;
    }

    private void cleanDisk(File file) {
        try {
            Path filePath = file.toPath();
            Files.delete(filePath);
        } catch (IOException e) {
            log.error("Error");
        }
    }

    private String getResourceType(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType != null) {
            if (contentType.startsWith("image/")) {
                return "image"; // File là ảnh
            } else if (contentType.startsWith("video/")) {
                return "video"; // File là video
            }
        }
        return "raw"; // Mặc định cho các file khác
    }


    public String generatePublicValue(String originalName){
        String filename = getFileName(originalName)[0];
        return StringUtils.join(UUID.randomUUID().toString(), "_", filename);
    }

    public String[] getFileName(String originalName){
        return originalName.split("\\.");
    }
}
