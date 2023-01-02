import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backdropUrl } from "../../constance/service";
import { Movie, MovieDetail, MovieTypes } from "../../utils/types/movie";
import MovieClass from "../../utils/classes/Movie";
import { RootState } from "../store";
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

export const fetchMovieByKeyword = createAsyncThunk(
  "movie/search",
  async (keyword: string) => {
    const movie = new MovieClass("search/movie");
    return movie.search(keyword);
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
    // Fetch movie list
    builder.addCase(fetchMovieList.pending, (movie, action) => {
      movie.list = [];
      movie.loading = true;
    });
    builder.addCase(fetchMovieList.fulfilled, (movie, action) => {
      movie.list = MovieClass.convertResponseToMovie(action.payload.results);
      movie.loading = false;
    });
    builder.addCase(fetchMovieList.rejected, (movie, action) => {
      movie.list = [];
      movie.loading = false;
    });

    // Fetch movie detail
    builder.addCase(fetchMovieDetail.pending, (movie, action) => {
      movie.selected = initialState.selected;
      movie.loading = true;
    });
    builder.addCase(fetchMovieDetail.fulfilled, (movie, action) => {
      movie.selected = {
        ...action.payload,
        backdrop_path: `${backdropUrl}/${action.payload.backdrop_path}`,
      };
      movie.loading = false;
    });
    builder.addCase(fetchMovieDetail.rejected, (movie, action) => {
      movie.list = [];
      movie.loading = false;
    });

    // Fetch movie by keyword
    builder.addCase(fetchMovieByKeyword.pending, (movie, action) => {
      movie.list = [];
      movie.loading = true;
    });
    builder.addCase(fetchMovieByKeyword.fulfilled, (movie, action) => {
      movie.list = MovieClass.convertResponseToMovie(action.payload.results);
      movie.loading = false;
    });
    builder.addCase(fetchMovieByKeyword.rejected, (movie, action) => {
      movie.list = [];
      movie.loading = false;
    });
  },
});

export const { setMovieType } = movieListSlice.actions;
export const movieSelector = (state: RootState) => state.movie;
export default movieListSlice.reducer;
