import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import { GetMovieByName } from "./services/getServices";
import { useDebounceHook } from "./utils/hook";
import { useQuery } from "@tanstack/react-query";
import Loader from "./components/Loader";
import { useDispatch } from "react-redux";
interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  rating: string;
}

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedText = useDebounceHook(searchQuery);
  const [movieAdded, setMovieAdded] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchMovies = async () => {
    if (!debouncedText) return [];
    const movies = await GetMovieByName(debouncedText);
    return movies?.data?.Search || [];
  };

  const {
    isLoading,
    error,
    data: fetchedMovies = [],
  } = useQuery({
    queryKey: ["movies", debouncedText],
    queryFn: fetchMovies,
    enabled: !!debouncedText,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  function handleSearchQuery(query: string) {
    setSearchQuery(query);
  }

  const handleAddToWatchlist = (imdbID: string): void => {
    if (!movieAdded.includes(imdbID))
      setMovieAdded((prev) => [...prev, imdbID]);
  };
  return (
    <div className="w-[65vw] mx-auto my-5 flex flex-col gap-5 ">
      <Header></Header>

      <SearchBar
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
      ></SearchBar>
      {!fetchedMovies.length && !isLoading && (
        <>
          <img
            className="mx-auto mt-5"
            src="/empty.svg"
            height={"40%"}
            width={"40%"}
          />
          <p className=" text-center mt-5 text-gray-500 font-semibold">
            Please enter the movie name you want to search
          </p>
        </>
      )}
      {isLoading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Boolean(fetchedMovies.length) &&
          fetchedMovies.map((movie: Movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              posterUrl={movie.Poster}
              year={movie.Year}
              imdbID={movie.imdbID}
              onAddToWatchlist={() => handleAddToWatchlist(movie.imdbID)}
              addedMovies={movieAdded}
            />
          ))}
      </div>
    </div>
  );
}
