import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backdropUrl } from "../../constance/service";
import { Movie, MovieDetail, MovieTypes } from "../../type/movie";
import MovieClass from "../classes/Movie";
interface MovieStore {
  currentType: MovieTypes;
  list: Movie[];
  selected: MovieDetail;
  loading: boolean;
}

export const fetchMovieList = createAsyncThunk(
  "movie/getList",
  async (type: MovieTypes) => {
    const movie = new MovieClass("movie");
    return movie.getList(type);
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movie/getDetail",
  async (id: number) => {
    const movie = new MovieClass("movie");
    return movie.getDetail(id);
  }
);

const initialState: MovieStore = {
  currentType: MovieTypes.top_rated,
  list: [],
  selected: {} as MovieDetail,
  loading: false,
};

const movieListSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {
    setMovieType: (movie, { payload }) => {
      movie.currentType = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieList.pending, (movie, action) => {
      movie.list = [];
      movie.loading = true;
    });
    builder.addCase(fetchMovieList.fulfilled, (movie, action) => {
      action.payload.results.forEach(
        ({ id, title, overview, backdrop_path }) => {
          movie.list.push({
            id,
            name: title,
            description: overview,
            imageUrl: `${backdropUrl}/${backdrop_path}`,
          });
        }
      );
      movie.loading = false;
    });
    builder.addCase(fetchMovieList.rejected, (movie, action) => {
      movie.list = [];
      movie.loading = false;
    });
    builder.addCase(fetchMovieDetail.pending, (movie, action) => {
      movie.selected = initialState.selected;
      movie.loading = true;
    });
    builder.addCase(fetchMovieDetail.fulfilled, (movie, action) => {
      movie.selected = action.payload;
      movie.loading = false;
    });
    builder.addCase(fetchMovieDetail.rejected, (movie, action) => {
      movie.list = [];
      movie.loading = false;
    });
  },
});

export const { setMovieType } = movieListSlice.actions;

export default movieListSlice.reducer;
