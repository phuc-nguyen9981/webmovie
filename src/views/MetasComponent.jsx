import React from "react";

const ALLOWED_PROPS = [
  "Rated",
  "Runtime",
  "Actors",
  "Plot",
  "Language",
  "Rating",
  "Metascore",
];

const MetasComponent = ({ movie = {} }) => {
  return (
    <div className="row py-3">
      <div className="mb-3 col-12 lg-title">
        <h1 className="">{movie?.Title || "Title"}</h1>
      </div>
      <div className="col-6 col-lg-3 d-flex justify-content-center align-items-center ">
        <img src={movie.Poster || ""} alt="Movie Poster" />
      </div>
      <div className="col-6 col-lg-9">
        <h1 className="title">{movie?.Title || "Title"}</h1>
        <div className="meta-content d-flex">
          {Object.keys(movie).map((key) => {
            if (!ALLOWED_PROPS.includes(key)) {
              return null;
            }
            const value = movie[key];
            return (
              <div key={key} className="w-50 text-start">
                <p>
                  <b>{key}:</b> {value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const compareProps = (nextProps, prevProps) => {
  return nextProps?.movie?.Id === prevProps?.movie?.Id;
};

export default React.memo(MetasComponent, compareProps);
