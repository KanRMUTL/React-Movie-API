import React, { ChangeEvent, useEffect } from "react";
import MediaCard from "../../utils/MediaCard";
import type { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import uniqid from "uniqid";
import {
  fetchMovieDetail,
  fetchMovieList,
  setMovieType,
} from "../../../app/slices/movieSlice";
import { store } from "../../../app/store";
import RowRadioButtonsGroup from "../../utils/RadioGroup";
import { Movie, MovieTypes } from "../../../type/movie";
import BackDrop from "../../utils/BackDrop";
import { useNavigate } from "react-router-dom";

const menu = [
  { label: "Popular", value: MovieTypes.popular },
  { label: "Now Playing", value: MovieTypes.now_playing },
  { label: "Top Rated", value: MovieTypes.top_rated },
  { label: "Upcomming", value: MovieTypes.upcoming },
];

function Movies() {
  const movie = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    store.dispatch(fetchMovieList(movie.currentType));
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMovieType(e.target.value));
    store.dispatch(fetchMovieList(e.target.value as MovieTypes));
  };

  const handleClickMovie = (id: number) => navigate(`${id}`);

  return (
    <Box>
      <RowRadioButtonsGroup
        onChnge={handleTypeChange}
        selectedValue={movie.currentType}
        label="Type"
        menu={menu}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={2}
      >
        {movie.list.map(({ id, name, imageUrl, description }) => (
          <Grid item key={uniqid()} style={{ cursor: "pointer" }}>
            <MediaCard
              onClick={() => handleClickMovie(id)}
              image={imageUrl}
              name={name}
              description={description}
            />
          </Grid>
        ))}
      </Grid>
      <BackDrop open={movie.loading} />
    </Box>
  );
}

export default Movies;
