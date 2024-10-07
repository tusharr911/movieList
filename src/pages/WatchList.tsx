import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { initiateWatchList, removeMovieInWatchList } from "../store/MovieSlice";
import { useQueries } from "@tanstack/react-query";
import { GetMovieByID } from "../services/getServices";
import { Movie } from "../utils/types";

const WatchList: React.FC = () => {
  const watchListArray = useSelector(
    (state: { movie: { watchListArray: string[] } }) =>
      state.movie.watchListArray
  );
  const moviesLength = useSelector(
    (state: { movie: { length: number } }) => state.movie.length
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiateWatchList());
  }, [dispatch]);

  const movieQueries = useQueries({
    queries: watchListArray.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => GetMovieByID(id).then((response) => response.data),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    })),
  });

  const movies = movieQueries
    .map((query) => query.data)
    .filter((movie): movie is Movie => movie !== undefined);

  const loading = movieQueries.some((query) => query.isLoading);
  const error = movieQueries.find((query) => query.isError)?.error;

  const handleRemoveFromWatchlist = (imdbID: string) => {
    dispatch(removeMovieInWatchList(imdbID));
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div>{error instanceof Error ? error.message : "An error occurred"}</div>
    );

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {moviesLength === 0 && (
        <div className="pt-10">
          <img
            className="mx-auto mt-5"
            src="/empty.svg"
            alt="Empty Wishlist"
            height={"40%"}
            width={"40%"}
          />
          <p className="text-center mt-5 text-gray-500 font-semibold">
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
            onAddToWatchlist={() => handleRemoveFromWatchlist(movie.imdbID)}
            remove
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(WatchList);
