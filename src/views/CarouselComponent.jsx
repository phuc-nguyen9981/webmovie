import React, { useCallback } from "react";
import Slider from "react-slick";
import { Form } from "react-bootstrap";
import Poster from "../components/Poster";

import "../stylesheets/App.scss";
import { ReactComponent as PrevArrow } from "../asset/arrow_back_ios_black_24dp.svg";
import { ReactComponent as NextArrow } from "../asset/arrow_forward_ios_black_24dp.svg";

function NextArrowComp(props) {
  const { className, style, onClick } = props;
  return (
    <NextArrow
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function PrevArrowComp(props) {
  const { className, style, onClick } = props;
  return (
    <PrevArrow
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
const SLIDER_SETTING = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: <NextArrowComp />,
  prevArrow: <PrevArrowComp />,
};

const CarouselComponent = ({
  movies = [],
  genres = [],
  onChangeGenre = () => {},
  onMovieClick = () => {},
}) => {
  const handleChangeGenre = useCallback(
    (e) => {
      onChangeGenre(e.target.value);
    },
    [onChangeGenre]
  );

  return (
    <div className="py-3 px-5 row">
      <div className="w-100 mr-3 d-flex justify-content-end">
        <Form.Select
          onChange={handleChangeGenre}
          className="py-1 carousel-select"
        >
          <option value={"All"}>All</option>
          {genres.sort().map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className="mt-4 carousel">
        <Slider {...SLIDER_SETTING}>
          {movies.map((item, index) => (
            <Poster
              key={item.Id}
              onClick={() => onMovieClick(item.Id)}
              className="mx-1 poster"
              src={item?.Poster || ""}
              alt="Movie Poster"
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselComponent;
