import React, { ChangeEvent, useEffect } from "react";
import MediaCard from "../../utils/MediaCard";
import type { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import uniqid from "uniqid";
import { fetchMovieList, setMovieType } from "../../../app/slices/movieSlice";
import { store } from "../../../app/store";
import RowRadioButtonsGroup from "../../utils/RadioGroup";
import { MovieTypes } from "../../../type/movie";

const menu = [
  { label: "Popular", value: MovieTypes.popular },
  { label: "Now Playing", value: MovieTypes.now_playing },
  { label: "Top Rated", value: MovieTypes.top_rated },
  { label: "Upcomming", value: MovieTypes.upcoming },
];

function Movies() {
  const movie = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    store.dispatch(fetchMovieList(movie.currentType));
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMovieType(e.target.value));
    store.dispatch(fetchMovieList(e.target.value as MovieTypes));
  };

  return (
    <Box>
      <RowRadioButtonsGroup
        onChnge={handleTypeChange}
        label="Type"
        menu={menu}
      />
      <Grid container spacing={2}>
        {movie.list.map(({ name, imageUrl, description }: any) => (
          <Grid item key={uniqid()}>
            <MediaCard image={imageUrl} name={name} description={description} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Movies;
