package com.booking_cinema.service.showtime;

import com.booking_cinema.dto.request.showtime.ShowtimeRequest;
import com.booking_cinema.dto.response.showtime.ShowtimeResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Cinema;
import com.booking_cinema.model.Movie;
import com.booking_cinema.model.Room;
import com.booking_cinema.model.ShowTime;
import com.booking_cinema.repository.CinemaRepository;
import com.booking_cinema.repository.MovieRepository;
import com.booking_cinema.repository.RoomRepository;
import com.booking_cinema.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShowtimeService implements IShowtimeService{
    private final ShowtimeRepository showtimeRepository;
    private final CinemaRepository cinemaRepository;
    private final MovieRepository movieRepository;

    private final RoomRepository roomRepository;
    @Override
    public List<ShowtimeResponse> getShowtimeWithMovieId(Long movieId) {
        if (movieRepository.findById(movieId).isEmpty()){
            throw new AppException(ErrorCode.MOVIE_NOTFOUND);
        }
        List<ShowTime> showTimes = showtimeRepository.findAllByMovieId_MovieId(movieId);
        return showTimes.stream()
                        .map(showTime -> new ShowtimeResponse(
                                showTime.getShowtimeId(),
                                showTime.getShowDate(),
                                showTime.getStartTime(),
                                showTime.getEndTime(),
                                showTime.getMovieId().getMovieId(),
                                showTime.getCinemaId().getCinemaId(),
                                showTime.getRoomId().getRoomId(),
                                showTime.getCreatedAt(),
                                showTime.getUpdatedAt()
                        ))
                        .toList();
    }

    @Override
    public List<ShowtimeResponse> getShowtimeWithCinemaId(Long cinemaId) {
        if (cinemaRepository.findById(cinemaId).isEmpty()){
            throw new AppException(ErrorCode.MOVIE_NOTFOUND);
        }
        List<ShowTime> showTimes = showtimeRepository.findAllByCinemaId_CinemaId(cinemaId);
        return showTimes.stream()
                        .map(showTime -> new ShowtimeResponse(
                                showTime.getShowtimeId(),
                                showTime.getShowDate(),
                                showTime.getStartTime(),
                                showTime.getEndTime(),
                                showTime.getMovieId().getMovieId(),
                                showTime.getCinemaId().getCinemaId(),
                                showTime.getRoomId().getRoomId(),
                                showTime.getCreatedAt(),
                                showTime.getUpdatedAt()
                        ))
                        .toList();
    }

    @Override
    public List<ShowtimeResponse> getShowtimeByCriteria(Long cinemaId, Long movieId, LocalDate showDate) {
        cinemaRepository.findById(cinemaId).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        movieRepository.findById(movieId).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));

        List<ShowTime> showTimes = showtimeRepository.findByCinemaId_CinemaIdAndMovieId_MovieIdAndShowDate(
                cinemaId, movieId, showDate
        );
        return showTimes.stream()
                .map(showTime -> new ShowtimeResponse(
                        showTime.getShowtimeId(),
                        showTime.getShowDate(),
                        showTime.getStartTime(),
                        showTime.getEndTime(),
                        showTime.getMovieId().getMovieId(),
                        showTime.getCinemaId().getCinemaId(),
                        showTime.getRoomId().getRoomId(),
                        showTime.getCreatedAt(),
                        showTime.getUpdatedAt()
                ))
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ShowtimeResponse createShowtime(ShowtimeRequest request) {
        Movie existingMovie = movieRepository.findById(request.getMovieId()).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        Cinema exitingCinema = cinemaRepository.findById(request.getCinemaId()).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        Room existingRoom = roomRepository.findById(request.getRoomId()).orElseThrow(() ->
                new AppException(ErrorCode.ROOM_NOTFOUND));

        if(!existingRoom.getCinemaId().getCinemaId().equals(request.getCinemaId())){
            throw new AppException(ErrorCode.ROOM_NOT_IN_CINEMA);
        }

        if(showtimeRepository.existsByShowDateAndRoomId_RoomIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                request.getShowDate(), request.getRoomId(), request.getStartTime(), request.getEndTime()
        )){
            throw new AppException(ErrorCode.SHOWTIME_CONFLICT);
        }



        ShowTime newShowtime = new ShowTime();
        newShowtime.setShowDate(request.getShowDate());
        newShowtime.setStartTime(request.getStartTime());
        newShowtime.setEndTime(request.getEndTime());
        newShowtime.setMovieId(existingMovie);
        newShowtime.setCinemaId(exitingCinema);
        newShowtime.setRoomId(existingRoom);
        showtimeRepository.save(newShowtime);

        ShowtimeResponse response = ShowtimeResponse.toShowtimeResponse(newShowtime);
        return response;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public ShowtimeResponse updateShowtime(Long showtimeId, ShowtimeRequest request) {
        Movie existingMovie = movieRepository.findById(request.getMovieId()).orElseThrow(() ->
                new AppException(ErrorCode.MOVIE_NOTFOUND));
        Cinema exitingCinema = cinemaRepository.findById(request.getCinemaId()).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        ShowTime existingShowtime = showtimeRepository.findById(showtimeId).orElseThrow(() ->
                new AppException(ErrorCode.SHOWTIME_NOTFOUND));

        Room existingRoom = roomRepository.findById(request.getRoomId()).orElseThrow(() ->
                new AppException(ErrorCode.ROOM_NOTFOUND));

        existingShowtime.setShowDate(request.getShowDate());
        existingShowtime.setStartTime(request.getStartTime());
        existingShowtime.setEndTime(request.getEndTime());
        existingShowtime.setMovieId(existingMovie);
        existingShowtime.setCinemaId(exitingCinema);
        existingShowtime.setRoomId(existingRoom);
        showtimeRepository.save(existingShowtime);

        ShowtimeResponse response = ShowtimeResponse.toShowtimeResponse(existingShowtime);
        return response;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteShowtime(Long showtimeId) {
        ShowTime existingShowtime = showtimeRepository.findById(showtimeId).orElseThrow(() ->
                new AppException(ErrorCode.SHOWTIME_NOTFOUND));
        showtimeRepository.deleteById(showtimeId);
    }


}
