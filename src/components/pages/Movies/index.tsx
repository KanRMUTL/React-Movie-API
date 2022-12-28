import React, { useEffect } from "react";
import MediaCard from "../../utils/MediaCard";
import type { RootState } from "../../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { setMovieList } from "../../../app/slices/movieListSlice";
import { Grid } from "@mui/material";
import {Movie} from '../../../type/movie'
import uniqid from 'uniqid';

function Movies() {
  const movies = useSelector((state: RootState) => state.movieList);
  const dispatch = useDispatch()
  const mockMovie: Movie = {
    name: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
    description: "Siblings Lucy, Edmund, Susan and Peter step through a magical wardrobe and find the land of Narnia. There, they discover a charming, once peaceful kingdom that has been plunged into eternal winter by the evil White Witch, Jadis. Aided by the wise and magnificent lion, Aslan, the children lead Narnia into a spectacular, climactic battle to be free of the Witch\'s glacial powers forever.",
    imageUrl: 'https://www.themoviedb.org/t/p/w1280/clfyMMg00OiowO5uupKpVKjRwmV.jpg',
    year: 2003,
    rating: 4
  }

  useEffect(()=> {
    dispatch(setMovieList([mockMovie]))
  }, [])

  return (
    <Grid container spacing={2}>
      {movies.map(({ name, imageUrl, description }) => (
        <MediaCard key={uniqid()} image={imageUrl} name={name} description={description} />
      ))}
    </Grid>
  );
}

export default Movies;
