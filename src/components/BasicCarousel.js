import React, { useState } from "react";
import { Carousel } from "../react-bootstrap/component";
import "../styles/Home.css";

export default function BasicCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100 background__image"
          src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 background__image"
          src="https://wallpapercave.com/wp/wp9506513.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 background__image"
          src="https://img5.goodfon.com/wallpaper/nbig/a/12/natiurmort-eda-predmety-posuda-temnyi-fon-kompozitsiia-kapus.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
