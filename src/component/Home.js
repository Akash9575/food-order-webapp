import React from "react";
import ItemCard from "./ItemCard";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <img
        className="background__image"
        src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
        alt="Something Went Wrong"
      />
      <div className="itemcard__container">
        <ItemCard />
      </div>
    </>
  );
};

export default Home;
