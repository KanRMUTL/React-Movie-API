import React, { useEffect } from "react";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { fetchMovieDetail } from "../../../app/slices/movieSlice";
import { store } from "../../../app/store";

import BackDrop from "../../utils/BackDrop";
import { useMatches } from "react-router-dom";

function MovieDetail() {
  const movie = useSelector((state: RootState) => state.movie);
  const [match] = useMatches();

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    const id = Number(match.params.id);
    store.dispatch(fetchMovieDetail(id));
  };

  return (
    <Box>
      <BackDrop open={movie.loading} />
    </Box>
  );
}

export default MovieDetail;
