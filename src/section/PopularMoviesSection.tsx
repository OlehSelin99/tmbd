import "./PopularMoviesSection.css";
import MovieCard from "../component/MovieCard";
import { useGetPopularMoviesQuery } from "../store/movieApiSlice";

import { useNavigate } from "react-router-dom";

const PopularMoviesSection = () => {
  const navigate = useNavigate();

  const {
    data: popularMovies,
    isLoading,
    isError,
  } = useGetPopularMoviesQuery({});

  if (isLoading) {
    return <div>Loading popular movies...</div>;
  }

  if (isError) {
    return <div>Error loading popular movies.</div>;
  }

  const handleClick = () => {
    // Implement navigation to the full popular movies page
    console.log(
      "View More button clicked. Navigating to full popular movies page...",
    );

    navigate("/movies");
  };

  return (
    <div className="popular-movies-section">
      <h1 className="popular-movies-title">Popular Movies</h1>
      <div className="movies-grid">
        {popularMovies?.results.slice(0, 6).map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
        /* Show only the top 6 popular movies */
        }
      </div>
      <button className="view-more-button" onClick={handleClick}>
        View More
      </button>
    </div>
  );
};

export default PopularMoviesSection;
