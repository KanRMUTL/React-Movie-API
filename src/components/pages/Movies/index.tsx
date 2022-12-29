import React, { useEffect } from "react";
import MediaCard from "../../utils/MediaCard";
import type { RootState } from "../../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { setMovieList } from "../../../app/slices/movieListSlice";
import { Grid } from "@mui/material";
import { Movie } from "../../../type/movie";
import uniqid from "uniqid";
import { backdropUrl } from "../../../constance/service";
import { fetchMovieList } from "../../../app/slices/movieListSlice";
import { store } from "../../../app/store";

function Movies() {
  const movies = useSelector((state: RootState) => state.movieList);
  const dispatch = useDispatch();
  useEffect(() => fetchData(), []);

  const fetchData = () => {
    store.dispatch(fetchMovieList()).then((action) => {
      const movieList: Movie[] = [];
      action.payload.forEach((item: any) => {
        movieList.push({
          name: item.title,
          description: item.overview,
          imageUrl: `${backdropUrl}/${item.backdrop_path}`,
        });
      });
      dispatch(setMovieList(movieList));
    });
  };

  return (
    <Grid container spacing={2}>
      {movies.map(({ name, imageUrl, description }: any) => (
        <Grid item key={uniqid()}>
          <MediaCard image={imageUrl} name={name} description={description} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Movies;
