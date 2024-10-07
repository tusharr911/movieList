import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import { GetMovieByName } from "./services/getServices";
import { useDebounceHook } from "./utils/hook";
import { useQuery } from "@tanstack/react-query";
import Loader from "./components/Loader";
import { useDispatch } from "react-redux";
import { addMovieInWatchList, initiateWatchList } from "./store/MovieSlice";
import ErrorNotification from "./components/ErrorNotification";
import Cookie from "js-cookie";
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
  const dispatch = useDispatch();
  const [movieAdded, setMovieAdded] = useState<string[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

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
  useEffect(() => {
    dispatch(initiateWatchList());
  }, [dispatch]);

  const handleAddToWatchlist = (imdbID: string): void => {
    dispatch(addMovieInWatchList(imdbID));
    if (!movieAdded.includes(imdbID))
      setMovieAdded((prev) => [...prev, imdbID]);
  };
  useEffect(() => {
    dispatch(initiateWatchList());

    const username = Cookie.get("user");

    if (username) {
      setNotificationMessage(`Welcome ${username}`);
      setShowError(true);
    } else {
      setNotificationMessage("User not found");
      setShowError(true);
    }
  }, [dispatch]);

  return (
    <div className="w-[65vw] mx-auto my-5 flex flex-col gap-5 ">
      <ErrorNotification
        message={notificationMessage}
        show={showError}
        setShow={setShowError}
        success={true}
      />
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
          fetchedMovies.map((movie) => (
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
