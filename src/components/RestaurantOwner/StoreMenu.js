import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { base_url } from "../../urls/url";
import "../../styles/StoreMenu.css";
import { toast } from "react-toastify";
toast.configure();

const StoreMenu = () => {
  let navigate = useNavigate();
  const [registerMsg, setRegisterMsg] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [allRestaurantItem, setAllRestaurantItem] = useState([]);
  const [register_restaurant_status, setRegister_Restaurant_Status] =
    useState();
  const [restaurant_id, setRestaurant_id] = useState();

  const user_id = useSelector((state) => state.auth.user_id);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleEditItem = (e) => {
    setShowEditModal(true);
  };

  useEffect(() => {
    if (user_id !== 0) {
      fetch(`${base_url}/users/res_owner_show`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setRestaurant_id(data.id);
            if (data.status === false || data.status === true) {
              setRegister_Restaurant_Status(data.status);
            }
            if (data.message) {
              setRegisterMsg(data.message);
            }
            if (data.items) {
              setAllRestaurantItem(data.items);
            }
          } else {
            toast.error('Items Not Found', {
              theme: "colored",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user_id]);

  const handleRestaurnatNavigate = (event) => {
    navigate("../registerrestaurant");
  };

  const handleAddItemNavigate = (event) => {
    navigate("../addItem", { state: restaurant_id });
  };

  const onDelete = (item_id) => {
    fetch(`${base_url}/api/v1/items/${item_id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data) {
        //   toast.error("Item Deleted Successfully !!", {
        //     theme: "colored",
        //     type: "error",
        //   });
        // } else {
        //   toast.success("Item Not Deleted", {
        //     theme: "colored",
        //     type: "success",
        //   });
        // }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {registerMsg === "Not registered" ? (
        <h1
          style={{
            padding: "200px 100px",
            margin: "50px",
            backgroundColor: "gray",
          }}
        >
          You haven't Register Your Restaurant
          <div style={{ padding: "20px" }}>
            {" "}
            <Button onClick={handleRestaurnatNavigate}>
              {" "}
              Register Your Restaurant
            </Button>
          </div>
        </h1>
      ) : (
        <>
          {register_restaurant_status === false ? (
            <div className="restauntMenu_header">
              <h1>Your Request is Pending </h1>
            </div>
          ) : (
            <>
              <div className="restauntMenu_header">
                <h1>Your menu</h1>
                <Button onClick={handleAddItemNavigate}>Add Item</Button>
              </div>
              <div className="restaurantfoodItems">
                {allRestaurantItem.map((foodItem) => (
                  <>
                    <Card style={{ width: "50%" }} className="m-3 menuItem" key={foodItem.id}>
                      <Row className="no-gutters">
                        <Col md={5} lg={5}>
                          <Card.Img
                            variant="top"
                            className="menuItem_img"
                            src={foodItem.item_secure_url}
                          />
                        </Col>
                        <Col>
                          <Card.Body>
                            <Card.Title>{foodItem.item_name}</Card.Title>
                            <Card.Text>{foodItem.item_description}</Card.Text>
                            {/* <ModeEditIcon
                              color="primary"
                              fontSize="large"
                              onClick={handleEditItem}
                            /> */}
                            <DeleteIcon
                              fontSize="large"
                              onClick={() => onDelete(foodItem.id)}
                            />
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </>
                ))}
              </div>
              {showEditModal && (
                <Modal
                  show={showEditModal}
                  onHide={() => setShowEditModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add Food Item</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Row className="mb-3 p-4">
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Food item name</Form.Label>
                          <Form.Control
                            //   value={addItemData.item_name}
                            required
                            //   onChange={handleItemChanage}
                            name="item_name"
                            type="text"
                            placeholder="Food item name"
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom02"
                        >
                          <Form.Label>Item price</Form.Label>
                          <Form.Control
                            required
                            //   value={addItemData.item_price}
                            //   onChange={handleItemChanage}
                            name="item_price"
                            type="number"
                            placeholder="Enter price"
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-12 p-4">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom02"
                        >
                          <Form.Label>Food item description</Form.Label>
                          <Form.Control
                            required
                            //   value={addItemData.item_description}
                            //   onChange={handleItemChanage}
                            name="item_description"
                            as="textarea"
                            type="text"
                            placeholder="Food item description"
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-12 p-4">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom02"
                        >
                          <Form.Label>Food image</Form.Label>
                          <Form.Control
                            required
                            //   onChange={handleItemChanage}
                            //   value={addItemData.item_image}
                            name="item_image"
                            accept="image/*"
                            type="file"
                            placeholder="Add image"
                          />
                        </Form.Group>
                      </Row>
                      <Button className="m-4" type="submit">
                        Submit form
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default StoreMenu;
