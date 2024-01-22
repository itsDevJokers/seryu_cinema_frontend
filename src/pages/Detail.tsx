// import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieBannerSection from "../components/sections/MovieBannerSection";
import useFetchMovies from "../hooks/useFetchMovies";
import MovieInlineSection from "../components/sections/MovieInlineSection";
import convertMinutesToHours from "../helpers/convertMinutesToHours";
// import { useParams } from 'react-router-dom';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: recommendationList,
    loading: recommendationListLoading,
    error: recommendationListError,
  }: {
    data: any;
    loading: boolean;
    error: any;
  } = useFetchMovies(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1NDM4MjVlNTFmNDNiMDVlM2IzZWYyODBmMDNlNSIsInN1YiI6IjY1YWI5ZDc4N2Q1NTA0MDEyNGQ1NDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17-cPKYLAP1tVhBl8uJ8Fw5kONOzUSJu5quPHkq3ihc",
      },
    }
  );

  const {
    data: movieDetail,
    loading: movieDetailLoading,
    error: movieDetailError,
  }: {
    data: any;
    loading: boolean;
    error: any;
  } = useFetchMovies(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTA1NDM4MjVlNTFmNDNiMDVlM2IzZWYyODBmMDNlNSIsInN1YiI6IjY1YWI5ZDc4N2Q1NTA0MDEyNGQ1NDUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.17-cPKYLAP1tVhBl8uJ8Fw5kONOzUSJu5quPHkq3ihc",
      },
    }
  );

  const movieDetails = {
    id: movieDetail?.id,
    title: movieDetail?.title,
    coverPath: "https://image.tmdb.org/t/p/w500" + movieDetail?.poster_path,
    backdropPath:
      "https://image.tmdb.org/t/p/w500" + movieDetail?.backdrop_path,
    releaseDate: movieDetail?.release_date,
    genres: ["Action", "Comedy"],
    duration: convertMinutesToHours(movieDetail?.runtime),
    rating: Math.round(movieDetail?.vote_average * 10) / 10,
    overview: movieDetail?.overview,
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      {movieDetailLoading && <p className="text-white">Loading...</p>}
      {movieDetailError && (
        <p className="text-white">Error: {movieDetailError}</p>
      )}
      <MovieBannerSection
        id={movieDetails.id}
        title={movieDetails.title}
        backdropPath={movieDetails.backdropPath}
        releaseDate={movieDetails.releaseDate}
        genres={movieDetails.genres}
        duration={movieDetails.duration}
        rating={movieDetails.rating}
        overview={movieDetails.overview}
        coverPath={movieDetails.coverPath}
      />
      <MovieInlineSection
        title="Recommendations"
        movies={recommendationList?.results}
        loading={recommendationListLoading}
        error={recommendationListError}
      />
      {/* <RecommendationSection recommendations={recommendations} /> */}
      {/* Any additional sections or components */}
    </div>
  );
};

export default Detail;
