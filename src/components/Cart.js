import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartAction } from "../store/cart-slice";
import {
  ShoppingCartOutlinedIcon,
  Modal,
  Button,
  Form,
} from "../react-bootstrap/component";
import { fetchCartData } from "../store/cart-actions";
import { sendOrderData } from "../store/cart-actions";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleClose = () => setCartIsShown(false);
  const handleShow = () => setCartIsShown(true);
  const handleForm = () => setFormIsOpen(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalCartPrice = useSelector((state) => state.cart.totalCartPrice);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user_id = useSelector((state) => state.auth.user_id);

  const showCart = () => {
    if (isLoggedIn) {
      handleShow();
      dispatch(fetchCartData(user_id));
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  const removeItemHandler = (id) => {
    dispatch(CartAction.removeItemFromCart(id));
  };

  const addItemHandler = (id, name, price) => {
    dispatch(
      CartAction.addItemtoCart({
        id,
        name,
        price,
      })
    );
  };

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (address.length < 20) {
      return alert("Please Enter Adress 20 char long");
    } else if (items.length === 0) {
      return alert("Please Add Item in Cart");
    }
    const order = {
      address,
      item_id: items[0].id,
      status: "Pending",
      order_obj: {...items},
      user_id,
      item_quantity: totalQuantity,
      total_price: totalCartPrice,
      delivery_id: 2
    };
    dispatch(sendOrderData(order));
    setAddress("");
    setFormIsOpen(false);
    handleClose();
  };

  return (
    <>
      <ShoppingCartOutlinedIcon style={{ color: "white" }} onClick={showCart} />

      <Modal
        show={cartIsShown}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {items.map((item) => {
            const { id, price, totalPrice, name, quantity } = item;
            return (
              <li className="item">
                <header>
                  <h3>{name}</h3>
                  <div className="price">
                    ${totalPrice.toFixed(2)}{" "}
                    <span className="itemprice">${price}</span>
                  </div>
                </header>
                <div className="details">
                  <div className="quantity">
                    x <span>{quantity}</span>
                  </div>
                  <div className="actions">
                    <button onClick={() => removeItemHandler(id)}>-</button>
                    <button onClick={() => addItemHandler(id, name, price)}>
                      +
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
          <div className="d-flex justify-content-between">
            <h4>Total Items : {totalQuantity}</h4>
            <h4>Total Price : ${totalCartPrice}</h4>
          </div>
          {formIsOpen && (
            <div className="mt-5">
              <Form onSubmit={onSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={address}
                    placeholder="Please Enter Your Address"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {formIsOpen && (
            <Button variant="success" onClick={onSubmit}>
              Confirm
            </Button>
          )}
          {!formIsOpen && (
            <Button variant="success" onClick={handleForm}>
              Order
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
