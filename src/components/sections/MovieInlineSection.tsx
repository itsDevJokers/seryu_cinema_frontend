import React from "react";
import MovieCard from "../MovieCard";

interface MovieInlineSectionProps {
  title: string;
  loading?: boolean;
  error?: any;
  movies: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  }[];
}

// Contoh data, asumsikan ini akan diganti dengan data sebenarnya dari API

const MovieInlineSection: React.FC<MovieInlineSectionProps> = ({
  title,
  movies,
  loading,
  error,
}) => {
  return (
    <section className="px-5 py-5 sm:px-24">
      <h2 className="text-xl sm:text-3xl  my-6 text-white font-semibold font-['Poppins']">
        {title}
      </h2>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-white">Error: {error.message}</p>}
      {movies?.length === 0 && <p className="text-white">No movies found...</p>}
      <div className="flex flex-row overflow-x-auto gap-4">
        {movies?.map((movie) => (
          <div className="min-w-max flex-none">
            {" "}
            {/* Apply flex-none and min-w-max for consistent size */}
            <MovieCard
              id={movie?.id}
              title={movie.title}
              posterPath={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              releaseDate={movie.release_date}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieInlineSection;
