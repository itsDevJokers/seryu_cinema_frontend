import Navbar from "../components/Navbar";
import MovieGridSection from "../components/sections/MovieGridSection";
// import NowPlaying from "../components/sections/NowPlayingSection";

const Favourite: React.FC = () => {
  const favoriteMovies = JSON.parse(
    localStorage.getItem("favoriteList") || "[]"
  );

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <MovieGridSection title="Your Favourite" movies={favoriteMovies} />
    </div>
  );
};

export default Favourite;
