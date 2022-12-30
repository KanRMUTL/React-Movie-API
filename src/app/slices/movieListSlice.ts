import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl, token, backdropUrl } from "../../constance/service";
import { Movie, MovieResponse } from "../../type/movie";

export const fetchMovieList = createAsyncThunk("movieList/fetch", async () => {
  const url = `${apiBaseUrl}/movie/popular`;
  const result = await axios.get<MovieResponse>(url, {
    params: {
      api_key: token,
    },
  });
  return result.data;
});

interface MovieStore {
  type: string;
  list: Movie[];
}
const initialState: MovieStore = {
  type: "",
  list: [],
};

const movieListSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    setMovieList: (state, { payload }) => (state = payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieList.fulfilled, (state, action) => {
      action.payload.results.forEach((item: any) => {
        state.list.push({
          name: item.title,
          description: item.overview,
          imageUrl: `${backdropUrl}/${item.backdrop_path}`,
        });
      });
    });
  },
});

export const { setMovieList } = movieListSlice.actions;

export default movieListSlice.reducer;
