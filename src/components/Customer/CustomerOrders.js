import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomerOrders } from "../../store/actions/order-actions";
import {END_POINTS} from '../../constants/constant';
import { Row, Col, Card, Button, Badge } from "../../react-bootstrap/component";

const CustomerOrders = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.auth.user_id);
  const customer_orders = useSelector((state) => state.order.customer_orders);

  useEffect(() => {
    if (user_id !== 0) {
      dispatch(fetchCustomerOrders(user_id))
    }
  }, [user_id]);

  // const showProgressBar = () => {
  //   navigate(END_POINTS.CUSTOMER_PROGRESS_BAR);
  // }

  return (
    <>
      {customer_orders.length === 0 ? (
        <div className="bg-info p-5 m-5 w-50 mx-auto">
        <h1>No Orders Available</h1>
        </div>
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
                  {/* <Card.Text>Time : {customer_order.created_at}</Card.Text> */}
                  {/* <Card.Text>Order Items : </Card.Text> */}
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
