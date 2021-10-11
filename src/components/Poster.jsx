import React from "react";

const Poster = ({
  className = "",
  style = {},
  src = "",
  alt = "",
  onClick = () => {},
}) => {
  return (
    <img
      className={className}
      style={{ ...style }}
      src={src || ""}
      alt={alt}
      onClick={onClick}
    />
  );
};

export default Poster;
