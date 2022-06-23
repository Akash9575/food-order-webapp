import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPendingOrders } from "../store/order-actions";
import { fetch_url } from "../urls/url";
import { Table, Card, Badge, Row, Col, Button } from "react-bootstrap";
import "./Request.css";

const Request = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user_id);
  const pending_orders = useSelector((state) => state.order.pending_orders);
  console.log(pending_orders)

  useEffect(() => {
    if (user_id !== 0) dispatch(fetchPendingOrders(user_id));
  }, [user_id]);

  const handelAcceptOrder = (order_id) => {
    console.log(order_id);
    fetch(`${fetch_url}/api/v1/orders/${order_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        status: "Accepted by Restaurant",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4 request_row">
        {pending_orders.length > 0 ? (
          pending_orders.map((order) => {
            {
              /* const order_items = [];
            for (let key in order.order_obj.cartitem[key]) {
              order_items.push(order.order_obj.cartitem[key]);
            } */
            }
            return (
              <Col key={order.id}>
                <Card className="request_card">
                  <Card.Body>
                    <Card.Title>Order Id : {order.id}</Card.Title>
                    <Card.Text>
                      {/* <h4>Food Items:</h4> */}

                      {/* {order_items.map((foodItem) => (
                        <>
                          <div>
                            <h2>
                              {foodItem.item_quantity} {foodItem.order_obj}{" "}
                            </h2>
                          </div>
                        </>
                      ))} */}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      Address : {order.address}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      Total Items : {order.item_quantity}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      Total Price : {order.totalPrice}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {order.status === "false" ? (
                      <Button onClick={() => handelAcceptOrder(order.id)}>
                        Accept
                      </Button>
                    ) : (
                      <Button disabled>Recevied</Button>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        ) : (
          <h1>You don't have any Oreder request</h1>
        )}
      </Row>
    </>
  );
};

export default Request;
