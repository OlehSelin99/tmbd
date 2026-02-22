import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../store/movieApiSlice";
import "./MoviePage.css";

const MoviePage = () => {
  const params = useParams();

  const { data: movie, isLoading, isError } = useGetMovieByIdQuery(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading movie details.</div>;
  }

  return (
    <div className="movie-page-container">
      <div className="movie-page-content">
        <h1 className="movie-title">{movie?.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          alt="Movie Poster"
        />
        <br />
        <h2 className="movie-overview">Overview: </h2>
        <p className="movie-overview-text"> {movie?.overview}</p>
        <br />
        <h3>Release Date:</h3>
        <p>{movie?.release_date}</p>
        <br />
        <h4>Rating:</h4> <p>{movie?.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
};
export default MoviePage;
