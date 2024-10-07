import { configureStore } from "@reduxjs/toolkit";
import movieReducer, { MovieState } from "./MovieSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export type RootState = {
  movie: MovieState;
};
