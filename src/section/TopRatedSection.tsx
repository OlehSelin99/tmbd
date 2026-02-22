import "./TopRatedSection.css";
import MovieCard from "../component/MovieCard";
import { useGetTopRatedMoviesQuery } from "../store/movieApiSlice";

const TopRatedSection = () => {

  const {
    data: topRatedMovies,
    isLoading,
    isError,
  } = useGetTopRatedMoviesQuery({});

  if (isLoading) {
    return <div>Loading top rated movies...</div>;
  }

  if (isError) {
    return <div>Error loading top rated movies.</div>;
  }

  return (
    <div className="top-rated-movies-section">
      <h1 className="top-rated-movies-title">Top Rated Movies</h1>
      <div className="movies-grid">
        {topRatedMovies?.results.slice(0, 6).map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
        /* Show only the top 6 top rated  movies */
        }
      </div>
    </div>
  );
};

export default TopRatedSection;
