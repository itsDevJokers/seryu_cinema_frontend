import { LogOutIcon, MenuIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import useFetchMovies from "../hooks/useFetchMovies";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const session_id = localStorage.getItem("session_id") as string;

  const {
    data: movieListByQuery,
  }: // loading: topRatedListLoading,
  // error: topRatedListError,
  {
    data: any;
    loading: boolean;
    error: any;
  } = useFetchMovies(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1NDM4MjVlNTFmNDNiMDVlM2IzZWYyODBmMDNlNSIsInN1YiI6IjY1YWI5ZDc4N2Q1NTA0MDEyNGQ1NDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17-cPKYLAP1tVhBl8uJ8Fw5kONOzUSJu5quPHkq3ihc",
      },
    },
    800
  );

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

  const handleLogout = async () => {
    try {
      // Menggunakan endpoint untuk mendapatkan request token baru
      const response = await axios.delete(
        `https://api.themoviedb.org/3/authentication/session?session_id=${session_id}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1NDM4MjVlNTFmNDNiMDVlM2IzZWYyODBmMDNlNSIsInN1YiI6IjY1YWI5ZDc4N2Q1NTA0MDEyNGQ1NDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17-cPKYLAP1tVhBl8uJ8Fw5kONOzUSJu5quPHkq3ihc",
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("session_id");
        localStorage.removeItem("watchlist");
        localStorage.removeItem("favoriteList");
        setIsLogoutModalOpen(false);
        redirect("/");
      }
    } catch (error) {
      console.error("Error during TMDB authentication:", error);
      // Handle error seperti menampilkan pesan ke pengguna
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <nav className="bg-blue-600 text-white py-5 px-5 sm:px-24 flex justify-between items-center">
      <Link
        to="/"
        className="text-white text-3xl sm:text-5xl font-black font-['Poppins'] tracking-[4px] sm:tracking-[16px] "
      >
        CINEMA
      </Link>

      <div className="inline-flex sm:hidden  rounded-md mr-8">
        {/* <a
          href="#"
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
        >
          Option
        </a> */}

        <div className="relative">
          <div className="flex items-center">
            <div>
              <MenuIcon className="w-6 h-6" onClick={toggleDropdown} />
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                  <div className="p-2">
                    <div className="relative flex-1 mx-4 ">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="text-black w-full px-2 py-1 border rounded-md focus:outline-none"
                      />
                      {/* Separator */}
                      {/* <hr className="my-2 w-full" /> */}
                      <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      {searchTerm && (
                        <div className="absolute z-10 top-full left-0 right-0 bg-white border max-h-60 overflow-y-auto">
                          <div className="p-2 z-20 hover:bg-gray-100 text-black">
                            test
                          </div>
                        </div>
                      )}
                    </div>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                    >
                      Favorite
                    </Link>
                    <Link
                      to="/Watchlist"
                      className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                    >
                      Watchlist
                    </Link>
                    <p className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700">
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-x-4 hidden sm:flex items-center sm:space-x-12 sm:text-base">
        <div className="relative flex-1 mx-4 ">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="text-black w-full px-2 py-1 rounded-md focus:outline-none"
          />
          <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          {searchTerm && (
            <div className="absolute z-10  top-full left-0 right-0 bg-white max-h-60 overflow-y-auto">
              {movieListByQuery?.results?.map((movie: any) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <div className="p-2 hover:bg-gray-100 text-black">
                    {movie.title}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {session_id ? (
          <>
            <Link to="/favorite" className="hover:text-gray-300">
              Favorite
            </Link>
            <Link to="/watchlist" className="hover:text-gray-300">
              Watchlist
            </Link>
          </>
        ) : (
          <>
            <p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-gray-300"
              >
                Favorite
              </button>
            </p>
            <p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-gray-300"
              >
                Watchlist
              </button>
            </p>
          </>
        )}
        {session_id && (
          <LogOutIcon
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => setIsLogoutModalOpen(true)}
          />
        )}
      </div>
      {isModalOpen && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isLogoutModalOpen && (
        <LogoutModal
          onLogout={handleLogout}
          onCancel={() => setIsLogoutModalOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
