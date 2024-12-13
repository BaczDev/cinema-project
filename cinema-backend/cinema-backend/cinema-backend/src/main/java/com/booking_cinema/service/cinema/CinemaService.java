package com.booking_cinema.service.cinema;

import com.booking_cinema.dto.request.cinema.CinemaRequest;
import com.booking_cinema.dto.response.cinema.CinemaResponse;
import com.booking_cinema.exception.AppException;
import com.booking_cinema.exception.ErrorCode;
import com.booking_cinema.model.Cinema;
import com.booking_cinema.repository.CinemaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
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
        CinemaResponse cinemaResponse = CinemaResponse.toCinemaResponse(existingCinema);
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
    @PreAuthorize("hasRole('ADMIN')")
    public CinemaResponse createCinema(CinemaRequest request) {
        if(cinemaRepository.existsByCinemaName(request.getCinemaName())){
            throw new AppException(ErrorCode.CINEMA_EXISTED);
        }
        Cinema newCinema = new Cinema();
        newCinema.setCinemaName(request.getCinemaName());
        newCinema.setCinemaAddress(request.getCinemaAddress());
        cinemaRepository.save(newCinema);
        CinemaResponse cinemaResponse = CinemaResponse.toCinemaResponse(newCinema);
        return cinemaResponse;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public CinemaResponse updateCinema(Long cinemaId, CinemaRequest request) {
        Cinema existingCinema = cinemaRepository.findById(cinemaId).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        existingCinema.setCinemaName(request.getCinemaName());
        existingCinema.setCinemaAddress(request.getCinemaAddress());
        cinemaRepository.save(existingCinema);
        CinemaResponse cinemaResponse = CinemaResponse.toCinemaResponse(existingCinema);
        return cinemaResponse;

    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCinema(Long cinemaId) {
        cinemaRepository.findById(cinemaId).orElseThrow(() ->
                new AppException(ErrorCode.CINEMA_NOTFOUND));
        cinemaRepository.deleteById(cinemaId);
    }
}
