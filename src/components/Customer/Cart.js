import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CartAction } from "../../store/slices/cart-slice";
import { fetchCartData } from "../../store/actions/cart-actions";
import { sendOrderData } from "../../store/actions/order-actions";
import { END_POINTS } from "../../constants/constant";
import {ShoppingCartOutlinedIcon,Modal,Button,Form} from "../../react-bootstrap/component";
import "../../styles/Cart.css";
import { toast } from "react-toastify";
toast.configure();

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
      toast.error('Please Login', {
        theme: "colored",
        type: "error",
      });
      navigate(END_POINTS.LOGIN);
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
      return toast.error('Please Enter Address 20 Charactor Long', {
        theme: "colored",
        type: "error",
      });
    } else if (items.length === 0) {
      return toast.error('Please Add Item In Cart', {
        theme: "colored",
        type: "error",
      });
    }
    const order = {
      address,
      restaurant_id: items[0].id,
      status: "Pending",
      order_obj: {...items},
      user_id,
      item_quantity: totalQuantity,
      total_price: totalCartPrice,
    };
    dispatch(sendOrderData(order));
    setAddress("");
    setFormIsOpen(false);
    handleClose();
  };

  return (
    <>
      <ShoppingCartOutlinedIcon style={{ color: "white" }} onClick={showCart} /><sup className="text-white"><h6>{totalQuantity}</h6></sup>

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
              <li className="item" key={id}>
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
              Confirm Order
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