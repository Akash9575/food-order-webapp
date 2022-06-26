import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPendingOrders } from "../../store/actions/order-actions";
import { base_url } from "../../urls/url";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../../styles/Request.css";
import { toast } from "react-toastify";
toast.configure();

const Request = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user_id);
  const pending_orders = useSelector((state) => state.order.pending_orders);

  let order_items = [];

  useEffect(() => {
    if (user_id !== 0) dispatch(fetchPendingOrders(user_id));
  }, [user_id, dispatch]);

  const handelAcceptOrder = (order_id) => {
    fetch(`${base_url}/api/v1/orders/${order_id}`, {
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
      .then((data) => {
        if (data) {
          toast.success("Recived Successfully", {
            theme: "colored",
            type: "success",
          });
        } else {
          toast.error("Not Accepted", {
            theme: "colored",
            type: "error",
          });
        }
      });
  };

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4 request_row">
        {pending_orders.length > 0 ? (
          pending_orders.map((order) => {
              for (let key in order.order_obj) {
                order_items.push(order.order_obj[key]);
              }
            return (
              <Col key={order.id}>
                <Card className="request_card">
                  <Card.Body className="p-3">
                    <Card.Title>Order Id : {order.id}</Card.Title>
                    <Card.Text className="mt-3">
                      <h5 className="my-3">Food Items:</h5>

                      {order_items.map((foodItem) => (
                        <>
                          <div className="d-flex justify-content-around">
                          <Card.Text>Name : {foodItem.name}</Card.Text>
                          <Card.Text>Quntity : {foodItem.quantity}</Card.Text>
                          </div>
                        </>
                      ))}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      Total Items : {order.item_quantity}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "20px" }}>
                      Total Price : ${order.total_price}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {order.status === "Pending" ? (
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
          <div className="m-5 bg-info p-5 w-50">
            <h1>No Pending Orders Available</h1>
          </div>
        )}
      </Row>
    </>
  );
};

export default Request;
