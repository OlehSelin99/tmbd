import { useLocation } from "react-router-dom";
import { useGetMovieByTitleQuery } from "../store/movieApiSlice";
import MovieCard from "../component/MovieCard";
import "./Search.css";

const Search = () => {
  const location = useLocation();

  const searchTerm = location.state?.query || "";

  const { data: movies } = useGetMovieByTitleQuery({
    searchValue: searchTerm,
    skip: searchTerm === "",
  });

  return (
    <div className="search-results">
      {movies?.results.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Search;
