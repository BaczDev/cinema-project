import axios from './CustomizeAxios';

const getMovies = () => {
    return axios.get("/api/v1/movie");
}

const createMovie = (token, movieName, moviePosterUrl, movieLength) => {
    return axios.post("/api/v1/movie/create", {
        movieName: movieName,
        moviePosterUrl: moviePosterUrl,
        movieLength: movieLength
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const uploadPoster = (token, movieId, file) => {
    const formData = new FormData();
    formData.append('files', file);
    return axios.post(`/api/v1/movie/upload-poster/${movieId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getMovie = (movieId) => {
    return axios.get(`/api/v1/movie/${movieId}`);
}

const updateMovie = (token, movieId, movieName, movieLength) => {
    return axios.put(`/api/v1/movie/update/${movieId}`, {
        movieName: movieName,
        movieLength: movieLength
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const deleteMovie = (token, movieId) => {
    return axios.delete(`/api/v1/movie/delete/${movieId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }});
}



export { getMovies, createMovie, uploadPoster, getMovie, updateMovie, deleteMovie };