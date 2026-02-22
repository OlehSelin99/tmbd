import NowPlayingSection from "../section/NowPlayingSection";
import PopularMoviesSection from "../section/PopularMoviesSection";
import TopRatedSection from "../section/TopRatedSection";
import WelcomeSection from "../section/WelcomeSection";

const Main = () => {
  return (
    <>
      <WelcomeSection />
      <PopularMoviesSection />
      <TopRatedSection />
      <NowPlayingSection />
    </>
  );
};

export default Main;
