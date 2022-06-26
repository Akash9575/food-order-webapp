import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "../react-bootstrap/component";
import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "../store/slices/cart-slice";
import { FOOD_CATEGORY, END_POINTS } from "../constants/constant";
import CallIcon from "@mui/icons-material/Call";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmailIcon from "@mui/icons-material/Email";
import "../styles/Restaurant.css";
import { toast } from "react-toastify";
toast.configure();

const Restaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [val, setVal] = useState(0);
  const [allItemData, setAllItemData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { item } = location.state;

  useEffect(() => {
    setAllItemData(item.items);
    setCategoriesData(item.items);
  }, []);

  useEffect(() => {
    if (categories === "AllItem") {
      setCategoriesData(allItemData);
    } else if (val === 1) {
      const RestaurantCategoriesItems = allItemData.filter((food) =>
        food.item_category.toLowerCase().includes(categories.toLowerCase())
      );
      setCategoriesData(RestaurantCategoriesItems);
    }
    setVal(1);
  }, [categories]);

  const handleCategories = (e) => {
    setCategories(e.value);
  };

  const addItemHandler = (foodItem) => {
    if (isLoggedIn) {
      dispatch(
        CartAction.addItemtoCart({
          id: foodItem.id,
          title: foodItem.item_name,
          price: foodItem.item_price,
        })
      );
    } else {
      toast.error("Please Login", {
        theme: "colored",
        type: "error",
      });
      navigate(END_POINTS.LOGIN);
    }
  };
  return (
    <>
      <Card className="bg-dark text-white">
        <Card.Img
          src={item.secure_url}
          alt="Card image"
          className="restaurant__image"
        />
        <Card.ImgOverlay className="header_fooditem">
          <Card.Title style={{ fontSize: "40px" }}>
            {item.restaurant_name}
          </Card.Title>
          <Card.Text style={{ fontSize: "30px" }}>
            {item.restaurant_description}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
      <div className="foodItem_details">
        <div className="foodItems_category">
          <h5>Select Food Category</h5>
          <Select
            options={FOOD_CATEGORY}
            onChange={handleCategories}
            defaultValue={FOOD_CATEGORY[0]}
          />
        </div>
        <div className="restaurant_details">
          <h5 className="my-3 mx-5">
            <RestaurantIcon /> : <span>{`${item.restaurant_address}`}</span>
          </h5>
          <h5 className="my-3 mx-5">
            <CallIcon /> : <span>{`${item.restaurant_contact_number}`}</span>
          </h5>
          <h5 className="my-3 mx-5">
            <EmailIcon /> : <span>{`${item.restaurant_email}`}</span>
          </h5>
        </div>
      </div>

      <div className="foodItems">
        {categoriesData.length > 0 ? (
          categoriesData.map((foodItem) => {
            return (
              <>
                <Card className="m-3" key={foodItem.id}>
                  <Row className="no-gutters">
                    <Col md={5} lg={5}>
                      <Card.Img variant="top" src={foodItem.item_secure_url} />
                    </Col>
                    <Col className="my-auto">
                      <Card.Body className="d-flex align-items-center justify-content-between h-100">
                        <div>
                          <Card.Title className="my-2">
                            <b>{foodItem.item_name}</b>
                          </Card.Title>
                          <Card.Text className="my-2">{foodItem.item_description}</Card.Text>
                        </div>
                        <div>
                          <Card.Title className="my-2">
                            ${foodItem.item_price}
                            {foodItem.item_id}
                          </Card.Title>
                          <Button className="my-2"onClick={() => addItemHandler(foodItem)}>
                            Add to Cart
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </>
            );
          })
        ) : (
          <div className="m-5 p-5 bg-secondary text-white">
            <h1>No Items Available in This Category</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Restaurant;
