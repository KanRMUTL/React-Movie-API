import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";

import {
  fetchMovieDetail,
  movieSelector,
} from "../../../store/slices/movieSlice";
import BackDrop from "../../utils/BackDrop";
import { useMatches } from "react-router-dom";

const MovieDetail = () => {
  const movie = useSelector(movieSelector);
  const [match] = useMatches();
  const dispatch = useAppDispatch();

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    const id = Number(match.params.id);
    dispatch(fetchMovieDetail(id));
  };

  return (
    <Box>
      {!movie.loading && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h5">{movie.selected.title}</Typography>
          </Grid>
          <Grid container direction="row" justifyContent="center" mt={2} mb={2}>
            <img
              style={{ width: "70%" }}
              src={movie.selected.backdrop_path}
              alt="movie backdrop"
            />
          </Grid>
          <Grid item>
            <Typography>{movie.selected.overview}</Typography>
          </Grid>
        </Grid>
      )}
      <BackDrop open={movie.loading} />
    </Box>
  );
};

export default MovieDetail;
