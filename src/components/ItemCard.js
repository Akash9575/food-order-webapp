import React, { useEffect, useState } from "react";
import { Card, CardGroup, Row, Col, Badge } from "../react-bootstrap/component";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import "../styles/ItemCard.css";
import { base_url } from "../urls/url";

var a = 0;
const ItemCard = (props) => {
  const [allRestaurantData, setAllRestaurantData] = useState([]);
  const [cityViseRestaurant, setCityViseRestaurant] = useState([]);
  const [searchData, setSearchData] = useState([]);

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

  let navigate = useNavigate();

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
                  <small className="text-muted">{item.restaurant_city} </small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <h1>There are no restaurant available</h1>
        )}
      </Row>
    </>
  );
};

export default ItemCard;
