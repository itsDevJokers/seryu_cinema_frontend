import Navbar from "../components/Navbar";
import MovieInlineSection from "../components/sections/MovieInlineSection";
import MovieGridSection from "../components/sections/MovieGridSection";
import useFetchMovies from "../hooks/useFetchMovies";
import { useEffect } from "react";
import createSession from "../helpers/createSession";

const Home: React.FC = () => {
  const {
    data: nowPlayingList,
    loading: nowPlayingListLoading,
    error: nowPlayingListError,
  }: {
    data: any;
    loading: boolean;
    error: any;
  } = useFetchMovies(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1NDM4MjVlNTFmNDNiMDVlM2IzZWYyODBmMDNlNSIsInN1YiI6IjY1YWI5ZDc4N2Q1NTA0MDEyNGQ1NDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17-cPKYLAP1tVhBl8uJ8Fw5kONOzUSJu5quPHkq3ihc",
      },
    }
  );

  const {
    data: topRatedList,
    loading: topRatedListLoading,
    error: topRatedListError,
  }: {
    data: any;
    loading: boolean;
    error: any;
  } = useFetchMovies(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1NDM4MjVlNTFmNDNiMDVlM2IzZWYyODBmMDNlNSIsInN1YiI6IjY1YWI5ZDc4N2Q1NTA0MDEyNGQ1NDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17-cPKYLAP1tVhBl8uJ8Fw5kONOzUSJu5quPHkq3ihc",
      },
    }
  );

  useEffect(() => {
    // Ambil parameter 'request_token' dari URL, asumsikan Anda menggunakan React Router
    const searchParams = new URLSearchParams(window.location.search);
    const requestToken = searchParams.get("request_token");

    if (requestToken) {
      createSession(requestToken);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      {/* Banner will go here */}
      {/* Now Playing Section */}

      <MovieInlineSection
        title="Now Playing"
        loading={nowPlayingListLoading}
        error={nowPlayingListError}
        movies={nowPlayingList?.results}
      />
      {/* Top Rated Section */}
      <MovieGridSection
        loading={topRatedListLoading}
        error={topRatedListError}
        title="Top Rated"
        movies={topRatedList?.results}
      />
      {/* Footer will go here */}
    </div>
  );
};

export default Home;
