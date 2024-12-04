package com.booking_cinema.service.movieDetail;

import com.booking_cinema.dto.request.movieDetail.MovieDetailRequest;
import com.booking_cinema.dto.response.movieDetail.MovieDetailResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Movie;
import com.booking_cinema.model.MovieDetail;
import com.booking_cinema.repository.MovieDetailRepository;
import com.booking_cinema.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieDetailService implements IMovieDetailService{
    private final MovieDetailRepository movieDetailRepository;
    private final MovieRepository movieRepository;
    @Override
    public List<MovieDetailResponse> getAllMovieDetail() {
        List<MovieDetail> list = movieDetailRepository.findAll();
        return list.stream()
                   .map(movieDetail -> new MovieDetailResponse(
                           movieDetail.getMovieDetailId(),
                           movieDetail.getMovieDescription(),
                           movieDetail.getMovieTrailer(),
                           movieDetail.getMovieGenre(),
                           movieDetail.getReleaseDate(),
                           movieDetail.getMovieLanguage(),
                           movieDetail.getMovieId().getMovieId()
                   ))
                   .toList();
    }

    @Override
    public MovieDetailResponse getMovieDetailWithMovieId(Long movieId) {
        Movie existingMovie = movieRepository.findById(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        MovieDetail existingMovieDetail = movieDetailRepository.findByMovieId_MovieId(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_DETAIL_NOTFOUND));
        MovieDetailResponse movieDetailResponse = MovieDetailResponse.toMovieDetailResponse(existingMovieDetail);
        return movieDetailResponse;
    }

    @Override
    public MovieDetailResponse createMovieDetail(MovieDetailRequest request) {
        Movie existingMovie = movieRepository.findById(request.getMovieId()).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        if(movieDetailRepository.existsByMovieId_MovieId(request.getMovieId())){
            throw new AppException(ErrorCode.MOVIE_DETAIL_EXISTED);
        }

        MovieDetail newMovieDetail = new MovieDetail();
        newMovieDetail.setMovieDescription(request.getMovieDescription());
        newMovieDetail.setMovieTrailer(request.getMovieTrailer());
        newMovieDetail.setMovieGenre(request.getMovieGenre());
        newMovieDetail.setReleaseDate(request.getReleaseDate());
        newMovieDetail.setMovieLanguage(request.getMovieLanguage());
        newMovieDetail.setMovieId(existingMovie);
        movieDetailRepository.save(newMovieDetail);

        MovieDetailResponse movieDetailResponse = MovieDetailResponse.toMovieDetailResponse(newMovieDetail);
        return movieDetailResponse;
    }

    @Override
    public String uploadTrailer(Long movieDetailId, MultipartFile file) {
        MovieDetail existingMovieDetail = movieDetailRepository.findById(movieDetailId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_DETAIL_NOTFOUND));
        try {
            //ktra file null hoac rong
            if (file == null || file.isEmpty()){
                throw new AppException(ErrorCode.FILE_IS_NULL);
            }

            //check kich thuoc file toi da 100mb
            if(file.getSize() > 100 * 1024 * 1024){
                throw new AppException(ErrorCode.VIDEO_TOO_LARGE);
            }

            //check dinh dang file
            String contentType = file.getContentType();
            if (contentType == null || !isVideoFile(file)){
                throw new AppException(ErrorCode.INVALID_VIDEO_FORMAT);
            }

            //luu file
            String fileName = storeTrailerFile(file);

            existingMovieDetail.setMovieTrailer(fileName);
            movieDetailRepository.save(existingMovieDetail);

            return fileName;
        }catch (IOException e){
            throw new AppException(ErrorCode.FILE_UPLOAD_FAILED);
        }
    }

    private String storeTrailerFile(MultipartFile file) throws IOException {
        //check dinh dang file
        if (!isVideoFile(file) || file.getOriginalFilename() == null){
            throw new AppException(ErrorCode.INVALID_VIDEO_FORMAT);
        }

        //tao ten file duy nhat
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

        // Đường dẫn đến thư mục "trailers"
        java.nio.file.Path uploadDir = Paths.get("trailers");

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

    // Kiểm tra file có phải là video hay không
    private boolean isVideoFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("video/");
    }

    @Override
    public MovieDetailResponse updateMovieDetail(Long movieDetailId, MovieDetailRequest request) {
        Movie existingMovie = movieRepository.findById(request.getMovieId()).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        MovieDetail existingMovieDetail = movieDetailRepository.findById(movieDetailId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_DETAIL_NOTFOUND));
        existingMovieDetail.setMovieDescription(request.getMovieDescription());
        existingMovieDetail.setMovieTrailer(request.getMovieTrailer());
        existingMovieDetail.setMovieGenre(request.getMovieGenre());
        existingMovieDetail.setReleaseDate(request.getReleaseDate());
        existingMovieDetail.setMovieLanguage(request.getMovieLanguage());
        existingMovieDetail.setMovieId(existingMovie);
        movieDetailRepository.save(existingMovieDetail);

        MovieDetailResponse movieDetailResponse = MovieDetailResponse.toMovieDetailResponse(existingMovieDetail);
        return movieDetailResponse;
    }

    @Override
    public void deleteMovieDetail(Long movieDetailId) {
        if(!movieDetailRepository.existsById(movieDetailId)){
            throw new AppException();
        }
        movieDetailRepository.deleteById(movieDetailId);
    }
}
