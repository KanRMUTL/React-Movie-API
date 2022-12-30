import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBaseUrl, token, backdropUrl } from "../../constance/service";
import { Movie, MovieResponse, MovieTypes } from "../../type/movie";

interface MovieStore {
  currentType: MovieTypes;
  list: Movie[];
}

export const fetchMovieList = createAsyncThunk(
  "movie/fetch",
  async (movieType: MovieTypes) => {
    const url = `${apiBaseUrl}/movie/${movieType}`;
    const result = await axios.get<MovieResponse>(url, {
      params: {
        api_key: token,
      },
    });
    return result.data;
  }
);

const initialState: MovieStore = {
  currentType: MovieTypes.now_playing,
  list: [],
};

const movieListSlice = createSlice({
  name: "movie",
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
