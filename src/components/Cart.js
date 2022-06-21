import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartAction } from "../store/cart-slice";
import {ShoppingCartOutlinedIcon, Modal, Button } from "../react-bootstrap/component";
import '../styles/Cart.css';

const Cart = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const handleClose = () => setCartIsShown(false);
  const handleShow = () => setCartIsShown(true);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalCartPrice = useSelector((state) => state.cart.totalCartPrice);

  const showCart = () => {
    handleShow();
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

  return (
    <>
      <ShoppingCartOutlinedIcon style={{ color: "white" }} onClick={showCart} />

      <Modal
        show={cartIsShown}
        size='md'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {items.map((item) => {
          const {id, price, totalPrice, name, quantity} = item;
          return(
            <li className='item'>
            <header>
              <h3>{name}</h3>
              <div className='price'>
                ${totalPrice.toFixed(2)}{" "}
                <span className='itemprice'>
                  ${price}
                </span>
              </div>
            </header>
            <div className='details'>
              <div className='quantity'>
                x <span>{quantity}</span>
              </div>
              <div className='actions'>
                <button onClick={() => removeItemHandler(id)}>-</button>
                <button onClick={() => addItemHandler(id, name, price)}>+</button>
              </div>
            </div>
          </li>
          )
        })}
        <div className="d-flex justify-content-between">
          <h4>Total Items : {totalQuantity}</h4>
          <h4>Total Price : {totalCartPrice}</h4>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
