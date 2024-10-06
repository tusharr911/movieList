import React from "react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  title: string;
  posterUrl: string;
  year: string;
  imdbID: string;
  onAddToWatchlist: () => void;
  remove?: boolean;
  addedMovies?: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterUrl,
  year,
  imdbID,
  onAddToWatchlist,
  remove,
  addedMovies = [],
}) => {
  const navigate = useNavigate();
  const handleMovieChange = () => {
    navigate(imdbID);
  };
  return (
    <div className="shadow-xl py-2 px-2 flex flex-col gap-2 rounded-lg hover:shadow-2xl cursor-pointer transition-transform duration-300">
      <div
        className="h-68 w-full overflow-hidden rounded-md"
        onClick={handleMovieChange}
      >
        {" "}
        {posterUrl !== "N/A" ? (
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="h-full w-full object-cover object-top" 
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            No Image Found.
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex items-center justify-between font-semibold">
          <p className="text-lg">{title}</p>
          <p className="text-sm">{year}</p>
        </div>
        <button
          className="bg-zinc-800 text-white w-full py-2 rounded-md hover:bg-white hover:text-black transition-all hover:ring-1 ring-black mt-2"
          onClick={onAddToWatchlist}
          disabled={addedMovies?.includes(imdbID)}
        >
          {addedMovies?.includes(imdbID)
            ? "Already Added"
            : !remove
            ? "Add to Watchlist"
            : "Remove from Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
