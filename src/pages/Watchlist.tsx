import Navbar from "../components/Navbar";
import MovieGridSection from "../components/sections/MovieGridSection";
// import NowPlaying from "../components/sections/NowPlayingSection";

const Watchlist: React.FC = () => {
  const watchlistMovies = JSON.parse(localStorage.getItem("watchlist") || "[]");
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <MovieGridSection title="Your Watchlist" movies={watchlistMovies} />
    </div>
  );
};

export default Watchlist;
