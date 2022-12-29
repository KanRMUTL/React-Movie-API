import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl, token } from "../../constance/service";
import { Movie } from "../../type/movie";

const initialState: Movie[] = [];

const movieListSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    setMovieList: (state, { payload }) => (state = payload),
  },
});

export const fetchMovieList = createAsyncThunk("movieList/fetch", async () => {
  const url = `${apiBaseUrl}/movie/popular`;
  const result = await axios.get<any>(url, {
    params: {
      api_key: token,
    },
  });
  return result.data.results;
});

export const { setMovieList } = movieListSlice.actions;

export default movieListSlice.reducer;
