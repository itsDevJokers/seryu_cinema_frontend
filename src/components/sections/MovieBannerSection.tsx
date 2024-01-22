import React, { useState } from "react";
import formatDate from "../../helpers/formatDate";
import ScoreCircle from "../ScoreCircle";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal";

interface MovieBannerProps {
  id: number;
  title: string;
  backdropPath: string; // URL to the background image
  coverPath: string;
  releaseDate: string;
  genres: string[];
  duration: string;
  rating: number;
  overview: string;
}

const MovieBannerSection: React.FC<MovieBannerProps> = ({
  id,
  title,
  coverPath,
  backdropPath,
  releaseDate,
  genres,
  duration,
  rating,
  overview,
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
          { id, title, poster_path: coverPath, release_date: releaseDate },
        ])
      );

      navigate("/movie/" + id);
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

      navigate("/movie/" + id);
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
          { id, title, poster_path: coverPath, release_date: releaseDate },
        ])
      );

      navigate("/movie/" + id);
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

      navigate("/movie/" + id);
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <div className="relative ">
      <img
        src={backdropPath}
        alt={`Backdrop of ${title}`}
        className="w-full h-[calc(100vh-64px)] sm:h-80 object-cover"
      />
      <div className="absolute  inset-0 bg-black bg-opacity-50"></div>{" "}
      <div className="absolute mx-24 top-8 sm:bottom-8 left-0 right-0 ">
        <div className="flex flex-wrap lg:flex-nowrap">
          {" "}
          <img
            src={coverPath}
            alt={`Cover of ${title}`}
            className="rounded-lg  sm:w-48 sm:h-64 lg:mr-8"
          />
          <div className="text-white">
            <h1 className="text-3xl font-bold mt-4 lg:mt-0">
              {title} ({new Date(releaseDate).getFullYear()})
            </h1>
            <p className="text-sm mt-2">
              {/* Date to 01/01/2022 */}
              {formatDate(new Date(releaseDate))} • {genres.join(", ")} •{" "}
              {duration}
            </p>
            <div className="flex my-2 items-center gap-2">
              <ScoreCircle score={Number(rating)} />
              {location?.pathname?.split("/")[1] !== "watchlist" &&
              location?.pathname?.split("/")[1] !== "favorite" ? (
                <>
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
                </>
              ) : null}
            </div>
            <p className="text-sm italic my-4">The world forever changes</p>
            <div>
              <h3 className="text-sm font-semibold">Overview</h3>
              <p className=" text-sm ">{overview}</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieBannerSection;
