import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge } from "../react-bootstrap/component";
import { useNavigate } from "react-router-dom";
import { base_url } from "../urls/url";
import "../styles/ItemCard.css";

var a = 0;
const ItemCard = (props) => {
  const [allRestaurantData, setAllRestaurantData] = useState([]);
  const [cityViseRestaurant, setCityViseRestaurant] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${base_url}/api/v1/restaurants`);
      if (!response.ok) {
        throw new Error("Somthing went wrong");
      }
      const data = await response.json();
      setAllRestaurantData(data);
      setCityViseRestaurant(data);
      setSearchData(data);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (a == 1) {
      const cityRestaurant = allRestaurantData.filter(
        (item) => item.restaurant_city == props.city
      );
      setCityViseRestaurant(cityRestaurant);
      setSearchData(cityRestaurant);
    }
    a = 1;
  }, [props.city]);

  useEffect(() => {
    let matches = searchData.filter((item) => {
      return item.restaurant_name
        .toLowerCase()
        .includes(props.search.toLowerCase());
    });
    setCityViseRestaurant(matches);
  }, [props.search]);

  const selectRestaurant = (item) => {
    navigate(`/${item.restaurant_name}`, { state: { item } });
  };

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4 cardgroup__container">
        {cityViseRestaurant.length > 0 ? (
          cityViseRestaurant.map((item, index) => (
            <Col key={index}>
              <Card className="card" onClick={() => selectRestaurant(item)}>
                <Card.Img
                  className="card-img-top"
                  variant="top"
                  src={item.secure_url}
                />
                <Card.Body>
                  <Card.Title className="h3">{item.restaurant_name}</Card.Title>
                  <Card.Text className="h6">{item.restaurant_description}</Card.Text>
                </Card.Body>
                <Card.Footer className="footer">
                  {item.status ? (
                    <Badge pill style={{ fontSize: "15px" }} bg="primary">
                      open
                    </Badge>
                  ) : (
                    <Badge pill style={{ fontSize: "15px" }} bg="secondary">
                      close
                    </Badge>
                  )}
                  <h5 className="text-dark">{item.restaurant_city} </h5>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <h1>No Restaurants Available</h1>
        )}
      </Row>
    </>
  );
};

export default ItemCard;
