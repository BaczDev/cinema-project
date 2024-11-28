package com.booking_cinema.service.movie;

import com.booking_cinema.dto.request.movie.MovieRequest;
import com.booking_cinema.dto.response.movie.MovieResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Movie;
import com.booking_cinema.repository.MovieRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieService implements IMovieService{
    private final MovieRepository movieRepository;
    @Override
    public MovieResponse getMovie(Long movieId) {
        Movie existingMovie = movieRepository.findById(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        MovieResponse movieResponse = MovieResponse.toMovieResponse(existingMovie);
        return movieResponse;
    }

    @Override
    public List<MovieResponse> getAllMovie() {
        List<Movie> movies = movieRepository.findAll();
        return movies.stream()
                .map(movie -> new MovieResponse(
                        movie.getMovieId(),
                        movie.getMovieName(),
                        movie.getMoviePosterUrl(),
                        movie.getMovieLength(),
                        movie.getCreatedAt(),
                        movie.getUpdatedAt()
                ))
                .toList();
    }

    @Override
    public MovieResponse createMovie(MovieRequest request) {
        if(movieRepository.existsByMovieName(request.getMovieName())){
            throw new AppException(ErrorCode.MOVIE_EXISTED);
        }
        Movie newMovie = new Movie();
        newMovie.setMovieName(request.getMovieName());
        newMovie.setMoviePosterUrl(request.getMoviePosterUrl());
        newMovie.setMovieLength(request.getMovieLength());
        movieRepository.save(newMovie);
        MovieResponse movieResponse = MovieResponse.toMovieResponse(newMovie);
        return movieResponse;
    }

    @Override
    public String uploadPoster(Long movieId, MultipartFile file) {
        Movie existingMovie = movieRepository.findById(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        try{
            // Kiểm tra nếu file null hoặc rỗng
            if(file == null || file.isEmpty()){
                throw new AppException(ErrorCode.FILE_IS_NULL);
            }
            // Kiểm tra kích thước file (tối đa 10MB)
            if (file.getSize() > 10 * 1024 * 1024) {
                throw new AppException(ErrorCode.FILE_TOO_LARGE);
            }
            // Kiểm tra định dạng file
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new AppException(ErrorCode.INVALID_FILE_FORMAT);
            }

            // Lưu file vào thư mục "uploads"
            String fileName = storeFile(file);

            // Cập nhật thông tin poster của phim trong database
            existingMovie.setMoviePosterUrl(fileName);
            movieRepository.save(existingMovie);
            return fileName;
        }catch (IOException e){
            throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
        }

    }

    // Phương thức lưu file
    private String storeFile(MultipartFile file) throws IOException {
        // Kiểm tra định dạng file
        if (!isImageFile(file) || file.getOriginalFilename() == null) {
            throw new AppException(ErrorCode.INVALID_FILE_FORMAT);
        }

        // Lấy tên file gốc và tạo tên file duy nhất
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

        //Đường dẫn đến thư mục mà bạn muốn lưu file
        java.nio.file.Path uploadDir = Paths.get("uploads");

        // Tạo thư mục nếu chưa tồn tại
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        // Đường dẫn đầy đủ đến file
        java.nio.file.Path destination = uploadDir.resolve(uniqueFileName);

        // Sao chép file vào thư mục đích
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFileName;
    }

    // Kiểm tra file có phải là hình ảnh hay không
    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    @Override
    public MovieResponse updateMovie(Long movieId, MovieRequest request) {
        Movie existingMovie = movieRepository.findById(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        existingMovie.setMovieName(request.getMovieName());
        existingMovie.setMoviePosterUrl(request.getMoviePosterUrl());
        existingMovie.setMovieLength(request.getMovieLength());
        movieRepository.save(existingMovie);
        MovieResponse movieResponse = MovieResponse.toMovieResponse(existingMovie);
        return movieResponse;
    }

    @Override
    public void deleteMovie(Long movieId) {
        movieRepository.findById(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        movieRepository.deleteById(movieId);
    }
}
