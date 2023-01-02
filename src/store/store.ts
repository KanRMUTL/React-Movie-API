import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movieSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    movie: movieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
