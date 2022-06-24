import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "../react-bootstrap/component";
import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "../store/cart-slice";
import { options } from "../constants/constant";
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

  const { item } = location.state;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    setAllItemData(item.items);
    setCategoriesData(item.items);
  }, []);

  useEffect(() => {
    if (categories == "AllItem") {
      setCategoriesData(allItemData);
    } else if (val == 1) {
      const RestaurantCategoriesItems = allItemData.filter((food) =>
        food.item_category.toLowerCase().includes(categories.toLowerCase())
      );
      setCategoriesData(RestaurantCategoriesItems);
    }
    setVal(1);
  }, [categories]);

  const HandleCategories = (e) => {
    setCategories(e.value);
  };

  const AddItemHandler = (foodItem) => {
    if (isLoggedIn) {
      dispatch(
        CartAction.addItemtoCart({
          id: foodItem.id,
          title: foodItem.item_name,
          price: foodItem.item_price,
        })
      );
    } else {
      toast.error('Please Login', {
        theme: "colored",
        type: "error",
      });
      navigate("/login");
    }
  };
  return (
    <>
      <img
        className="background__image"
        src={item.secure_url}
        alt="Something Went Wrong"
      />
      <div className="header_fooditem">
        <h1 style={{ fontSize: "50px" }}>{item.restaurant_name}</h1>
        <h3>{item.restaurant_description}</h3>
      </div>

      <div className="foodItem_details">
        <div className="foodItems_category">
          <h4>Select Food Category</h4>
          <Select
            options={options}
            onChange={HandleCategories}
            defaultValue={options[0]}
          />
        </div>
        <div className="restaurant_details p-3 m-2">
        <h5>Restaurant address : <span>{`${item.restaurant_address}`}</span></h5>
        <h5>Restaurant number : <span>{`${item.restaurant_contact_number}`}</span></h5>
        <h5>Restaurant Email : <span>{`${item.restaurant_email}`}</span></h5>
          
        </div>
      </div>

      <div className="foodItems">
        {categoriesData.length > 0 ? (
          categoriesData.map((foodItem) => {
            return (
              <>
                <Card style={{ width: "50%" }}>
                  <Row className="no-gutters">
                    <Col md={5} lg={5}>
                      <Card.Img variant="top" src={foodItem.item_secure_url} />
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title><b>{foodItem.item_name}</b></Card.Title>
                        <Card.Text>{foodItem.item_description}</Card.Text>
                        <Card.Text>
                          ${foodItem.item_price}
                          {foodItem.item_id}
                        </Card.Text>
                        <Button onClick={() => AddItemHandler(foodItem)}>
                          Add to Cart
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </>
            );
          })
        ) : (
          <h1> There are no item in this category</h1>
        )}
      </div>
    </>
  );
};

export default Restaurant;
