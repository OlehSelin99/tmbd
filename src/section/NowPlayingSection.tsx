import "./NowPlayingSection.css";
import MovieCard from "../component/MovieCard";
import { useGetNowPlayingMoviesQuery } from "../store/movieApiSlice";


const NowPlayingSection = () => {

  const {
    data: nowPlayingMovies,
    isLoading,
    isError,
  } = useGetNowPlayingMoviesQuery({});

  if (isLoading) {
    return <div>Loading now playing movies...</div>;
  }

  if (isError) {
    return <div>Error loading now playing movies.</div>;
  }

  return (
    <div className="now-playing-section">
      <h1 className="now-playing-title">Now Playing Movies</h1>
      <div className="movies-grid">
        {nowPlayingMovies?.results.slice(0, 6).map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
        /* Show only the top 6 now playing movies */
        }
      </div>
    </div>
  );
};

export default NowPlayingSection;