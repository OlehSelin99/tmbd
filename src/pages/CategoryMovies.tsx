import { useNavigate, useParams } from "react-router-dom";
import { useGetMoviesByCategoryQuery } from "../store/movieApiSlice";
import MovieCard from "../component/MovieCard";
import "./CategoryMovies.css";
import Pagination from "../component/Pagination";
import { useEffect, useState } from "react";

const CategoryMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { category: currentCategory = "popular" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory]);

  const { data, error, isLoading } = useGetMoviesByCategoryQuery({
    category: currentCategory || "popular",
    page: currentPage,
  });

  const handleCategoryClick = (category: string) => {
    setCurrentPage(1);
    navigate(`/movies/${category}`);
  };

  const getButtonClass = (categoryName: string) => {
    return `category-button ${currentCategory === categoryName ? "active" : ""}`;
  };

  return (
    <div className="category-movies-container">
      <div className="category-movies-title">
        <button
          className={getButtonClass("popular")}
          onClick={() => {
            handleCategoryClick("popular");
          }}
        >
          Popular
        </button>
        <button
          className={getButtonClass("top_rated")}
          onClick={() => {
            handleCategoryClick("top_rated");
          }}
        >
          Top Rated
        </button>
        <button
          className={getButtonClass("now_playing")}
          onClick={() => {
            handleCategoryClick("now_playing");
          }}
        >
          Now Playing
        </button>
        <button
          className={getButtonClass("upcoming")}
          onClick={() => handleCategoryClick("upcoming")}
        >
          Upcoming
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.toString()}</p>}
      {data && (
        <div className="movies-grid">
          {data.results.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={data?.total_pages || 1}
      />
    </div>
  );
};
export default CategoryMovies;
