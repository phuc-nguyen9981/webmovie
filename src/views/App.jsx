import React, { useState, useEffect, useCallback, useMemo } from "react";

import { getMovies } from "../utils/api";

import MetasComponent from "./MetasComponent";
import CarouselComponent from "./CarouselComponent";

import "../stylesheets/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data.movies);
        setGenres([...data.genres]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErrorLoading(true);
      });
  }, []);

  const onChangeGenre = useCallback(
    (nextGenre) => {
      setSelectedGenre(nextGenre);
    },
    [setSelectedGenre]
  );
  const onSelectMovie = useCallback(
    (nextMovie) => {
      const index = movies.findIndex((item) => item.Id === nextMovie);
      console.log({ nextMovie, index, movies });
      if (index > -1) {
        setSelectedMovie(index);
      }
    },
    [movies]
  );
  const listDisplayMovie = useMemo(() => {
    if (selectedGenre === "All") {
      return movies;
    }
    const result = movies.filter((movie) => movie.Genre === selectedGenre);
    return result;
  }, [movies, selectedGenre]);

  if (errorLoading) {
    return (
      <h1>There is an error when we trying to fetch data. Please try again.</h1>
    );
  }
  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="App container-fluid">
      <MetasComponent movie={movies[selectedMovie]} />
      <CarouselComponent
        movies={listDisplayMovie}
        genres={genres}
        onChangeGenre={onChangeGenre}
        onMovieClick={onSelectMovie}
      />
    </div>
  );
}

export default App;
