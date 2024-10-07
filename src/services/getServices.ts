import axios from "axios";
import conf from "../conf/conf";

const api = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

export const GetMovieByName = (searchQuery: string) => {
  return api.get(
    `?apikey=${conf.Omdb_API_KEY}&s=${encodeURIComponent(
      searchQuery
    )}&type=movie`
  );
};

export const GetMovieByID = (IMDB_ID: string) => {
  return api.get(
    `?apikey=${conf.Omdb_API_KEY}&i=${encodeURIComponent(IMDB_ID)}&type=movie`
  );
};
