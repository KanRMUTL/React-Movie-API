import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../type/movie";
const initialState: Movie[] = [];

const movieListSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    setMovieList: (state, { payload }) => (state = payload),
  },
});

export const { setMovieList } = movieListSlice.actions;

export default movieListSlice.reducer;
