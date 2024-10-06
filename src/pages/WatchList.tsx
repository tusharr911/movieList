import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { initiateWatchList, removeMovieInWatchList } from "../store/MovieSlice";
import { useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import conf from "../conf/conf";
const WatchList = () => {
  const watchListArray = useSelector((state) => state.movie.watchListArray);
  const moviesLength = useSelector((state) => state.movie.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to fetch movie data by ID
  const fetchMovieData = async (id) => {
    const apiKey = conf.Omdb_API_KEY;
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
    );
    if (!response.ok) throw new Error(`Error fetching movie with ID: ${id}`);
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    dispatch(initiateWatchList());
  }, [dispatch]);
  // Use useQueries to fetch data for all movies in the watchlist
  const movieQueries = useQueries({
    queries: watchListArray.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => fetchMovieData(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    })),
  });

  const movies = movieQueries
    .map((query) => query.data)
    .filter((movie) => movie);

  const loading = movieQueries.some((query) => query.isLoading);
  const error = movieQueries.find((query) => query.isError)?.error;

  const handleRemoveoWatchlist = (imdbID: string) => {
    dispatch(removeMovieInWatchList(imdbID));
  };

  function handleClickHome() {
    navigate("/");
  }

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h2
        onClick={handleClickHome}
        className="text-2xl font-bold mb-4 cursor-pointer"
      >
        Movie List
      </h2>
      {moviesLength === 0 && (
        <div className="pt-10">
          <img
            className="mx-auto mt-5"
            src="/empty.svg"
            height={"40%"}
            width={"40%"}
          />
          <p className=" text-center mt-5 text-gray-500 font-semibold">
            Empty Wishlist
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            posterUrl={movie.Poster}
            year={movie.Year}
            imdbID={movie.imdbID}
            onAddToWatchlist={() => handleRemoveoWatchlist(movie.imdbID)}
            remove
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(WatchList);
