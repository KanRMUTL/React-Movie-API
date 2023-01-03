import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backdropUrl } from "../../constance/service";
import { Movie, MovieDetail, MovieTypes } from "../../utils/types/movie";
import MovieClass from "../../utils/classes/Movie";
import { RootState } from "../store";
interface MovieStore {
  currentType: MovieTypes;
  list: Movie[];
  page: number;
  totalPages: number;
  selected: MovieDetail;
  loading: boolean;
}

interface FetchMovieListProp {
  type: MovieTypes;
  page: number;
}

export const fetchMovieList = createAsyncThunk(
  "movie/getList",
  async ({ type, page }: FetchMovieListProp) => {
    const movie = new MovieClass("movie");
    return movie.getList(type, page);
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movie/getDetail",
  async (id: number) => {
    const movie = new MovieClass("movie");
    return movie.getDetail(id);
  }
);

interface FetchMovieByKeywordProps {
  keyword: string;
  page: number;
}

export const fetchMovieByKeyword = createAsyncThunk(
  "movie/search",
  async ({ keyword, page }: FetchMovieByKeywordProps) => {
    const movie = new MovieClass("search/movie");
    return movie.search(keyword, page);
  }
);

const initialState: MovieStore = {
  currentType: MovieTypes.top_rated,
  list: [],
  page: 1,
  totalPages: 1,
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
    setPage: (movie, { payload }) => {
      movie.page = payload;
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
      movie.totalPages = action.payload.total_pages;
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
      movie.totalPages = action.payload.total_pages
    });
    builder.addCase(fetchMovieByKeyword.rejected, (movie, action) => {
      movie.list = [];
      movie.loading = false;
    });
  },
});

export const { setMovieType, setPage } = movieListSlice.actions;
export const movieSelector = (state: RootState) => state.movie;
export default movieListSlice.reducer;
