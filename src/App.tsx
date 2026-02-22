import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Main from "./pages/Main";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import CategoryMovies from "./pages/CategoryMovies";
import FilteredMovies from "./pages/FilteredMovies";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MoviePage from "./pages/MoviePage";
import Footer from "./component/Footer";

function App() {
  const theme = useSelector((state: any) => state.theme);

  const isDark = theme.isDark;

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [isDark]);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Header />
      <div className="container-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies/" element={<CategoryMovies />} />
          <Route path="/movies/:category" element={<CategoryMovies />} />
          <Route path="/filtered-movies" element={<FilteredMovies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
