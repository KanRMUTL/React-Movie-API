import React, { ChangeEvent, useEffect, useState } from "react";
import MediaCard from "../../utils/MediaCard";
import { useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { Box, Grid, TextField } from "@mui/material";
import uniqid from "uniqid";
import {
  fetchMovieByKeyword,
  fetchMovieList,
  movieSelector,
  setMovieType,
} from "../../../store/slices/movieSlice";
import RowRadioButtonsGroup from "../../utils/RadioGroup";
import { MovieTypes } from "../../../utils/types/movie";
import BackDrop from "../../utils/BackDrop";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@react-hook/debounce";

const menu = [
  { label: "Popular", value: MovieTypes.popular },
  { label: "Now Playing", value: MovieTypes.now_playing },
  { label: "Top Rated", value: MovieTypes.top_rated },
  { label: "Upcomming", value: MovieTypes.upcoming },
];

const Movies = () => {
  const movie = useSelector(movieSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [keywordDebounce, setKeywordDebounce] = useDebounce("", 500);
  const [keyword, setKeyword] = useState("");

  useEffect(() => fetchData(), []);

  useEffect(() => {
    if (keywordDebounce) {
      dispatch(fetchMovieByKeyword(keywordDebounce));
    }
  }, [keywordDebounce]);

  const fetchData = () => {
    dispatch(fetchMovieList(movie.currentType));
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMovieType(e.target.value));
    dispatch(fetchMovieList(e.target.value as MovieTypes));
    setKeyword("");
    setKeywordDebounce("");
  };

  const handleChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setKeywordDebounce(e.target.value);
  };

  const handleClickMovie = (id: number) => navigate(`${id}`);

  return (
    <Box>
      <Grid container direction="row" justifyItems="center" spacing={3}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Search"
            value={keyword}
            onChange={handleChangeKeyword}
          />
        </Grid>
        <Grid item xs={6}>
          <RowRadioButtonsGroup
            onChnge={handleTypeChange}
            selectedValue={movie.currentType}
            label="Type"
            menu={menu}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="center" spacing={2}>
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
};

export default Movies;
