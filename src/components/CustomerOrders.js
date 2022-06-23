import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Badge } from "../react-bootstrap/component";
import { fetch_url } from "../urls/url";
import { useSelector } from "react-redux";

const CustomerOrders = () => {
  const [customer_orders, setCustomer_Orders] = useState([]);

  const user_id = useSelector((state) => state.auth.user_id);

  useEffect(() => {
    if (user_id !== 0) {
      fetch(`${fetch_url}/api/v1/orders/?user_id=${user_id}`, {
        mathod: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setCustomer_Orders(data))
        .catch((err) => console.log(err));
    }
  }, [user_id]);

  return (
    <>
      {customer_orders.length === 0 ? (
        <h1>You have not placed any order</h1>
      ) : (
        <Row xs={1} md={2} lg={3} className=" m-3 g-4">
          {customer_orders.map((customer_order) => (
            <Col key={customer_order.id}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-4">
                    Order Id : {customer_order.id}
                  </Card.Title>
                  <Card.Text>
                    Status :{" "}
                    <Badge pill bg="success">
                      {customer_order.status}
                    </Badge>
                  </Card.Text>
                  <Card.Text>Time : {customer_order.created_at}</Card.Text>
                  <Card.Text>Order Items : </Card.Text>
                  <Card.Text>
                    Total Items : {customer_order.item_quantity}
                  </Card.Text>
                  <Card.Text>
                    Total Amount : {customer_order.total_price}
                  </Card.Text>
                  <Card.Text>
                    Delivery Id : {customer_order.delivery_id}
                  </Card.Text>
                  <Button variant="info">Track Order</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default CustomerOrders;
