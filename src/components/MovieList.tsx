import MovieCard from "./MovieCard";

type moviesArrayProps = {};
export default function MovieList({ moviesArray }) {
  return (
    <main>
      {moviesArray.map((item) => (
        <MovieCard />
      ))}
    </main>
  );
}
