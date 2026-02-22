import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }: { movie: any }) => {
  return (
    <div className="movie-card-container">
      <div className="movie-image-container">
        <Link to={`/movie/${movie.id}`}>
          <img
            className="movie-image"
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path} ` : "https://placehold.co/600x400/EEE/31343C"}
            
          />
        </Link>
        <p className="movie-rating">{movie?.vote_average}</p>
      </div>

      <p className="movie-title">{movie?.title}</p>
    </div>
  );
};
export default MovieCard;
