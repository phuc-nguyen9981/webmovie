import React, { useCallback, useState } from "react";
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

const CarouselComponent = ({
  movies = [],
  genres = [],
  onChangeGenre = () => {},
  onMovieClick = () => {},
}) => {
  const SLIDER_SETTING = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrowComp />,
    prevArrow: <PrevArrowComp />,
    responsive: [
      {
        breakpoint: "992px",
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleChangeGenre = useCallback(
    (e) => {
      setCurrentSlide(0);
      onChangeGenre(e.target.value);
    },
    [setCurrentSlide, onChangeGenre]
  );

  SLIDER_SETTING.initialSlide = currentSlide;
  SLIDER_SETTING.responsive[0].initialSlide = currentSlide;

  if (movies.length === 0) {
    return <h2>No movies found.</h2>;
  }

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
        <Slider
          {...SLIDER_SETTING}
          afterChange={(index) => {
            setCurrentSlide(index);
          }}
        >
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
