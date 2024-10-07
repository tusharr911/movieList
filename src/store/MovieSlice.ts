import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import WatchList from "../pages/WatchList";

const initialState = {
  watchListArray: [],
  length: 0,
};

const MovieSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    addMovieInWatchList: (state, action) => {
      if (!state.watchListArray.includes(action.payload)) {
        state.watchListArray.push(action.payload);
        state.length += 1;
        const user = Cookies.get("user");
        const localData = JSON.parse(localStorage.getItem(user));
        localData.watchList.push(action.payload);
        localStorage.setItem(user, JSON.stringify(localData));
      }
    },
    removeMovieInWatchList: (state, action) => {
      state.watchListArray = state.watchListArray.filter(
        (item) => item !== action.payload
      );
      state.length -= 1;
      const user = Cookies.get("user");
      const localData = JSON.parse(localStorage.getItem(user));
      const output = localData.watchList.filter(
        (id: string) => id !== action.payload
      );
      localStorage.setItem(
        user,
        JSON.stringify({ ...localData, watchList: output })
      );
    },

    initiateWatchList: (state) => {
      const user = Cookies.get("user");
      const localData = JSON.parse(localStorage.getItem(user));
      if (localData && localData.watchList.length !== 0) {
        state.watchListArray = localData.watchList;
        state.length = localData.watchList.length;
      }
    },
    clearWatchList: (state) => {
      state.watchListArray = [];
      state.length = 0;
    },
  },
});

export const {
  addMovieInWatchList,
  removeMovieInWatchList,
  clearWatchList,
  initiateWatchList,
} = MovieSlice.actions;

export default MovieSlice.reducer;
