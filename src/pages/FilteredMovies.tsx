import "./FilteredMovies.css";
import { useGetMoviesByDiscoverQuery } from "../store/movieApiSlice";
import MovieCard from "../component/MovieCard";
import { useState } from "react";
import type { MovieProps } from "../type/Movie";
import useDebounce from "../hooks/useDebounce";

type SortOrder =
  | "popularity.asc"
  | "popularity.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "title.asc"
  | "title.desc";

const SORT_GROUPS = [
  {
    label: "Popularity",
    options: [
      { value: "popularity.desc", text: "Popularity Descending" },
      { value: "popularity.asc", text: "Popularity Ascending" },
    ],
  },
  {
    label: "Rating",
    options: [
      { value: "vote_average.desc", text: "Vote Average Descending" },
      { value: "vote_average.asc", text: "Vote Average Ascending" },
    ],
  },
  {
    label: "Release Date",
    options: [
      { value: "primary_release_date.desc", text: "Release Date Descending" },
      { value: "primary_release_date.asc", text: "Release Date Ascending" },
    ],
  },
  {
    label: "Title",
    options: [
      { value: "title.desc", text: "Title Descending" },
      { value: "title.asc", text: "Title Ascending" },
    ],
  },
];

const FilteredMovies = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("popularity.desc");

  // State for rating filters
  const [ratings, setRatings] = useState({
    gte: "",
    lte: "",
  });

  // Debounce the ratings to avoid excessive API calls while adjusting the sliders
  const debouncedRatings = useDebounce(ratings);

  // Fetch movies based on current filters
  const { data } = useGetMoviesByDiscoverQuery({
    sort_by: sortOrder,
    // Pass rating filters only if they are set
    "vote_average.gte": debouncedRatings.gte || undefined,
    "vote_average.lte": debouncedRatings.lte || undefined,
  });

  // Handle changes to rating filters
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the corresponding rating filter in state
    setRatings((prev) => ({ ...prev, [name.split(".")[1]]: value }));
  };

  return (
    <div className="filtered-movies">
      <div>
        <h1 className="filtered-movies-title">Filtered Movies</h1>
        <div className="filters">
          <label>
            Rating from: <strong>{ratings.gte}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            placeholder="0"
            name="vote_average.gte"
            value={ratings.gte}
            onChange={handleFilterChange}
          />
          <label> 
            Rating to: <strong>{ratings.lte}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            placeholder="10.0"
            name="vote_average.lte"
            value={ratings.lte}
            onChange={handleFilterChange}
          />

          <div className="filters-container">
            {SORT_GROUPS.map((group) => (
              <div key={group.label} className="filter-group">
                <label>{group.label}: </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                >
                  {group.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.text}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data && (
        <ul className="movie-list">
          {data?.results &&
            data.results.map((movie: MovieProps) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredMovies;
