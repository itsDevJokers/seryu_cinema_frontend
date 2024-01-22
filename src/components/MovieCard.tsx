import axios from "axios";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  releaseDate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const session_id = localStorage.getItem("session_id") as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const favoriteList = JSON.parse(
    localStorage.getItem("favoriteList") as string
  );
  const watchlist = JSON.parse(localStorage.getItem("watchlist") as string);

  const handleLogin = async () => {
    try {
      // Menggunakan endpoint untuk mendapatkan request token baru
      const response = await axios.get(
        "https://api.themoviedb.org/3/authentication/token/new",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1NDM4MjVlNTFmNDNiMDVlM2IzZWYyODBmMDNlNSIsInN1YiI6IjY1YWI5ZDc4N2Q1NTA0MDEyNGQ1NDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17-cPKYLAP1tVhBl8uJ8Fw5kONOzUSJu5quPHkq3ihc",
          },
        }
      );

      const token = response.data.request_token;

      if (token) {
        // Redirect pengguna untuk login dengan request token ini
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3001`;
      }
    } catch (error) {
      console.error("Error during TMDB authentication:", error);
      // Handle error seperti menampilkan pesan ke pengguna
    }
  };

  const handleAddWatchlist = () => {
    if (session_id) {
      localStorage.setItem(
        "watchlist",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("watchlist") || "[]"),
          { id, title, poster_path: posterPath, release_date: releaseDate },
        ])
      );

      navigate(location?.pathname);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDeleteWatchlist = () => {
    if (session_id) {
      localStorage.setItem(
        "watchlist",
        JSON.stringify(
          JSON.parse(localStorage.getItem("watchlist") || "[]").filter(
            (item: any) => item.id !== id
          )
        )
      );

      navigate(location?.pathname);
    } else {
      setIsModalOpen(true);
    }
  };
  const handleAddFavorite = () => {
    if (session_id) {
      localStorage.setItem(
        "favoriteList",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("favoriteList") || "[]"),
          { id, title, poster_path: posterPath, release_date: releaseDate },
        ])
      );

      navigate(location?.pathname);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDeleteFavorite = () => {
    if (session_id) {
      localStorage.setItem(
        "favoriteList",
        JSON.stringify(
          JSON.parse(localStorage.getItem("favoriteList") || "[]").filter(
            (item: any) => item.id !== id
          )
        )
      );

      navigate(location?.pathname);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full sm:w-48  shadow-lg rounded-lg overflow-hidden group">
      <div className="relative">
        <Link to={`/movie/${id}`}>
          <img
            src={posterPath}
            alt={title}
            className="w-full  sm:h-64 object-cover"
          />
        </Link>
        {location?.pathname?.split("/")[1] !== "watchlist" &&
        location?.pathname?.split("/")[1] !== "favorite" ? (
          <div className="absolute bottom-0 right-0 p-2 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* <BookmarkIcon
              className={"text-white h-6 w-6 cursor-pointer"}
              onClick={handleAddBookmark}
            /> */}
            {watchlist?.some((movie: any) => movie.id === id) ? (
              <BookmarkIcon
                className="text-white fill-white h-6 w-6 cursor-pointer"
                onClick={handleDeleteWatchlist}
              />
            ) : (
              <BookmarkIcon
                className="text-white  h-6 w-6 cursor-pointer"
                onClick={handleAddWatchlist}
              />
            )}
            {favoriteList?.some((movie: any) => movie.id === id) ? (
              <HeartIcon
                className="text-white fill-white h-6 w-6 cursor-pointer"
                onClick={handleDeleteFavorite}
              />
            ) : (
              <HeartIcon
                className="text-white  h-6 w-6 cursor-pointer"
                onClick={handleAddFavorite}
              />
            )}
          </div>
        ) : null}
      </div>
      <Link to={`/movie/${id}`}>
        <div className="p-4 bg-gray-950">
          <h3 className="font-bold text-lg text-zinc-400 truncate">{title}</h3>
          <p className="text-sm text-zinc-500 ">Released: {releaseDate}</p>
        </div>
      </Link>
      {isModalOpen && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieCard;
