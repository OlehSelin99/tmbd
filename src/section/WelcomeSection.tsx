import { useEffect, useState } from "react";
import { useGetPopularMoviesQuery } from "../store/movieApiSlice";
import "./WelcomeSection.css";
import { useNavigate } from "react-router-dom";

const WelcomeSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [randomMovie, setRandomMovie] = useState<any>(null);

  const {
    data: popularMovies,
    isLoading,
    isError,
  } = useGetPopularMoviesQuery({});

  useEffect(() => {
    const randomMovie =
      popularMovies?.results[
        Math.floor(Math.random() * popularMovies?.results.length)
      ];
    setRandomMovie(randomMovie);
  }, [popularMovies]);

  const handleSearch = () => {
    if (searchValue.trim() === "") {
      alert("Please enter a movie title to search.");
      return;
    }

    navigate(`/search`, { state: { query: searchValue } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="welcome-section" style={{ display: "grid" }}>
      {
        <img
          style={{ gridArea: "1/1" }}
          className="welcome-image"
          src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
          alt="Welcome backdrop"
        />
      }
      <div
        className="welcome-content"
        style={{
          zIndex: 1,
          gridArea: "1/1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="welcome-title">Welcome to MovieDB</h1>

        <input
          value={searchValue}
          className="welcome-search"
          type="text"
          placeholder="Search for movies..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};
export default WelcomeSection;
