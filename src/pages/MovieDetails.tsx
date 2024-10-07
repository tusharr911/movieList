import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import conf from "../conf/conf";

interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
}

const MovieDetails: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKeyOMDB = conf.Omdb_API_KEY;

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKeyOMDB}&i=${imdbID}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!movie) {
    return <Loader />;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {movie.Title}
              </a>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg col-span-1">
            <img
              src={movie.Poster}
              alt={`${movie.Title} Movie Poster`}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {movie.Title}
            </h1>
            <p className="text-2xl tracking-tight text-gray-900">
              Rating: {movie.imdbRating}/10
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Genres</h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {movie.Genre.split(", ").map((genre, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">
                Release Date
              </h3>
              <p className="mt-1 text-sm text-gray-700">{movie.Released}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Director</h3>
              <p className="mt-1 text-sm text-gray-700">{movie.Director}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Cast</h3>
              <p className="mt-1 text-sm text-gray-700">{movie.Actors}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-medium text-gray-900">Synopsis</h2>
              <p className="mt-1 text-sm text-gray-700">{movie.Plot}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
