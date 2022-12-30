import React, { useEffect } from "react";
import MediaCard from "../../utils/MediaCard";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import uniqid from "uniqid";
import { fetchMovieList } from "../../../app/slices/movieListSlice";
import { store } from "../../../app/store";

function Movies() {
  const movies = useSelector((state: RootState) => state.movieList);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    store.dispatch(fetchMovieList());
  };

  return (
    <Grid container spacing={2}>
      {movies.list.map(({ name, imageUrl, description }: any) => (
        <Grid item key={uniqid()}>
          <MediaCard image={imageUrl} name={name} description={description} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Movies;
