package com.booking_cinema.service.movie;

import com.booking_cinema.dto.request.movie.MovieRequest;
import com.booking_cinema.dto.request.movie.MovieUpdateRequest;
import com.booking_cinema.dto.response.movie.MovieResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Movie;
import com.booking_cinema.repository.MovieRepository;
import com.booking_cinema.service.cloudinary.ICloudinaryUpload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieService implements IMovieService{
    private final MovieRepository movieRepository;

    private final ICloudinaryUpload iCloudinaryUpload;
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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

            // Sử dụng dịch vụ upload file lên Cloudinary
            String fileUrl = iCloudinaryUpload.upload(file);

            // Cập nhật thông tin poster của phim trong database
            existingMovie.setMoviePosterUrl(fileUrl);
            movieRepository.save(existingMovie);
            return fileUrl;
        }catch (IOException e){
            throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
        }

    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public MovieResponse updateMovie(Long movieId, MovieUpdateRequest request) {
        Movie existingMovie = movieRepository.findById(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        existingMovie.setMovieName(request.getMovieName());
        existingMovie.setMovieLength(request.getMovieLength());
        movieRepository.save(existingMovie);
        MovieResponse movieResponse = MovieResponse.toMovieResponse(existingMovie);
        return movieResponse;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMovie(Long movieId) {
        movieRepository.findById(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        movieRepository.deleteById(movieId);
    }
}
