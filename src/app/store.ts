import { configureStore } from "@reduxjs/toolkit";
import movieListSlice from "./slices/movieListSlice";

export const store = configureStore({
  reducer: {
    movieList: movieListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
