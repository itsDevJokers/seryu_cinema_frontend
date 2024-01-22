import MovieCard from "../MovieCard";

interface MovieGridSectionProps {
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

const MovieGridSection: React.FC<MovieGridSectionProps> = ({
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
      <div className=" grid overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 sm:gap-4">
        {movies?.map((movie) => (
          <MovieCard
            id={movie.id}
            key={movie.id}
            title={movie.title}
            posterPath={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            releaseDate={movie.release_date}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieGridSection;
