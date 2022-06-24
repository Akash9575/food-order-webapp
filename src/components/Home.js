import React, { useState } from "react";
import ItemCard from "./ItemCard";
import "../styles/Home.css";

const Home = () => {

  const [showModel,setShowModel] = useState(false)
  const [city,setCity] = useState('Select City')
  const [search,setSearch] = useState('')

  const selectCity = (e) => {
    setCity(e.target.name)
    setShowModel(false)
  }

  const HandleSearch = (e) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <img
        className="background__image"
        src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
        alt="Something Went Wrong"
      />

      <div className="header_item">
          <button onClick={() => setShowModel(true)} className="select_city">{city}</button>
          <input className="search" onChange={HandleSearch} placeholder="Search restaurants....." /> 
      </div>


      <div className="itemcard__container">
        <ItemCard city={city} search={search}/>
      </div>
     {showModel &&  
      <>
      
      <div className="city_model">
        <div className="citys">
          <div className="citys_item">
            <img src="//in.bmscdn.com/m6/images/common-modules/regions/mumbai.png" alt="MUMBAI" name="Mumbai" onClick={selectCity} />
            <div>Mumbai</div>
          </div>
          <div className="citys_item">
              <img src="//in.bmscdn.com/m6/images/common-modules/regions/ncr.png" alt="NCR"  name="Delhi" onClick={selectCity}/>
              <div>Delhi</div>
          </div>
          <div className="citys_item">
              <img src="//in.bmscdn.com/m6/images/common-modules/regions/bang.png" alt="BANG" name="Bengaluru" onClick={selectCity}/>
              <div>Bengaluru</div>
          </div>
          <div className="citys_item">
                <img src="//in.bmscdn.com/m6/images/common-modules/regions/hyd.png" alt="HYD" name="Hyderabad " onClick={selectCity} />
              <div >Hyderabad </div>
          </div>
          <div className="citys_item">
                <img src="//in.bmscdn.com/m6/images/common-modules/regions/ahd.png" alt="AHD" name="Ahmedabad" onClick={selectCity} />
              <div >Ahmedabad</div>
          </div>
          <div className="citys_item">
                <img src="//in.bmscdn.com/m6/images/common-modules/regions/chd.png" alt="CHD" name="Chandigarh" onClick={selectCity}/>
              <div>Chandigarh</div>
          </div>
          <div className="citys_item">
            <img src="//in.bmscdn.com/m6/images/common-modules/regions/chen.png" alt="CHEN" name="Chennai" onClick={selectCity}/>
            <div>Chennai</div>
          </div>
          <div className="citys_item">
                <img src="//in.bmscdn.com/m6/images/common-modules/regions/pune.png" alt="PUNE"  name="Pune" onClick={selectCity}/>
              <div>Pune</div>
          </div>
          <div className="citys_item">
              <img src="//in.bmscdn.com/m6/images/common-modules/regions/kolk.png" alt="KOLK" name="Kolkata" onClick={selectCity} />
              <div>Kolkata</div>
          </div>
          <div className="citys_item">
              <img src="//in.bmscdn.com/m6/images/common-modules/regions/koch.png" alt="KOCH" name="Kochi" onClick={selectCity} />
              <div >Kochi</div>
          </div>
        </div>
      </div>
      </>
      }
    </>
  );
};

export default Home;
