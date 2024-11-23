package com.booking_cinema.service.cinema;

import com.booking_cinema.dto.request.cinema.CinemaRequest;
import com.booking_cinema.dto.response.cinema.CinemaResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Cinema;
import com.booking_cinema.repository.CinemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CinemaService implements ICinemaService{
    private final CinemaRepository cinemaRepository;
    @Override
    public CinemaResponse getCinema(Long cinemaId) {
        Cinema existingCinema = cinemaRepository.findById(cinemaId).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        CinemaResponse cinemaResponse = new CinemaResponse();
        cinemaResponse.setCinemaId(existingCinema.getCinemaId());
        cinemaResponse.setCinemaName(existingCinema.getCinemaName());
        cinemaResponse.setCinemaAddress(existingCinema.getCinemaAddress());
        cinemaResponse.setCreatedAt(existingCinema.getCreatedAt());
        cinemaResponse.setUpdatedAt(existingCinema.getUpdatedAt());
        return cinemaResponse;
    }

    @Override
    public List<CinemaResponse> getAllCinemas() {
        return cinemaRepository.findAll()
                .stream()
                .map(cinema -> new CinemaResponse(
                        cinema.getCinemaId(),
                        cinema.getCinemaName(),
                        cinema.getCinemaAddress(),
                        cinema.getCreatedAt(),
                        cinema.getUpdatedAt()
                ))
                .toList();
    }

    @Override
    public Cinema createCinema(CinemaRequest request) {
        if(cinemaRepository.existsByCinemaName(request.getCinemaName())){
            throw new AppException(ErrorCode.CINEMA_EXISTED);
        }
        Cinema newCinema = new Cinema();
        newCinema.setCinemaName(request.getCinemaName());
        newCinema.setCinemaAddress(request.getCinemaAddress());
        return cinemaRepository.save(newCinema);
    }

    @Override
    public CinemaResponse updateCinema(Long cinemaId, CinemaRequest request) {
        Cinema existingCinema = cinemaRepository.findById(cinemaId).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        existingCinema.setCinemaName(request.getCinemaName());
        existingCinema.setCinemaAddress(request.getCinemaAddress());
        cinemaRepository.save(existingCinema);
        CinemaResponse cinemaResponse = new CinemaResponse();
        cinemaResponse.setCinemaId(existingCinema.getCinemaId());
        cinemaResponse.setCinemaName(existingCinema.getCinemaName());
        cinemaResponse.setCinemaAddress(existingCinema.getCinemaAddress());
        cinemaResponse.setCreatedAt(existingCinema.getCreatedAt());
        cinemaResponse.setUpdatedAt(existingCinema.getUpdatedAt());
        return cinemaResponse;

    }

    @Override
    public void deleteCinema(Long cinemaId) {
        cinemaRepository.findById(cinemaId).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        cinemaRepository.deleteById(cinemaId);
    }
}
