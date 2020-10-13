import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    }
}

 const handleClick = (movie) => {
   if (trailerUrl) {
     setTrailerUrl('');

   }else {
     movieTrailer(movie?.name || '')
     .then(url => {
       console.log(url)
       const urlparams = new URLSearchParams(new URL(url).search)
       console.log(urlparams)
       setTrailerUrl(urlparams.get('v'))

     }).catch((error) => {
       console.log(error)
     })
   }
 }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
            onClick={ () => handleClick(movie)}
              key={movie.id}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
