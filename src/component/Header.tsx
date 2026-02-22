import "./Header.css";
import imageLogo from "../assets/tmbd-logo.svg";
import { Link } from "react-router-dom";
import Toggle from "./ToggleTheme";
import { toggleTheme } from "../store/themeSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Header = () => {
  type CustomLinkProps = {
    className1: string;
    className2: string;
    to: string;
    children: React.ReactNode;
  };

  const CustomLink = ({
    className1,
    className2,
    to,
    children,
  }: CustomLinkProps) => {
    return (
      <li className={className1}>
        <p className={className2}></p>
        <div className={`${className2}-content`}>
          <Link to={to}>{children}</Link>
        </div>
      </li>
    );
  };

  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(false);

  const handleDark = () => {
    dispatch(toggleTheme());
    setIsDark(!isDark);
  };

  return (
    <header className="header-container">
      <Link to="/" className="tmbd-title">
        <img
          src={imageLogo}
          alt=""
          style={{ width: "200px", height: "150px" }}
        />
      </Link>
      <div className="header-container-content">
        <ul className="container">
          <CustomLink
            className1="dropdown-container"
            className2="dropbt-movies"
            to="/"
          >
            Main
          </CustomLink>
          <CustomLink
            className1="dropdown-container"
            className2="dropbt-tv-shows"
            to="/movies"
          >
            Category Movies
          </CustomLink>
          <CustomLink
            className1="dropdown-container"
            className2="dropbt-more"
            to="/filtered-movies"
          >
            Filtered Movies
          </CustomLink>
          <CustomLink
            className1="dropdown-container"
            className2="dropbt-awards"
            to="/search"
          >
            Search
          </CustomLink>
          <CustomLink
            className1="dropdown-container"
            className2="dropbt-more"
            to="/favorites"
          >
            Favorites
          </CustomLink>
        </ul>
        <Toggle isChecked={isDark} handleChange={() => handleDark()} />
      </div>
    </header>
  );
};

export default Header;
