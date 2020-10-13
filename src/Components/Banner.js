import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../request";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const random = Math.floor(Math.random() * 20);
      const rndMovies = request.data.results[random];
      setMovie(rndMovies);
      return request;
    }
    fetchData();
  }, []);

  function truncate(strn, n) {
    return strn?.length > n ? strn.substr(0, n - 1) + "..." : strn;
  }
  return (
    <header
      className="banner"
      style={{
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeButton"></div>

      {/* <title></title> */}
      {/* div > 2 buttons */}
      {/* description */}
    </header>
  );
}

export default Banner;
