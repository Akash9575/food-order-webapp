import React from "react";
import Card from "react-bootstrap/Card";
import "./AcceptedOrders.css";

const AcceptedOrders = () => {
  return (
    <>
      <div className="acceptedorders__container">
        <Card className="acceptedorders__card py-3">
            <Card.Title>
              <h1>Order Id</h1>
            </Card.Title>
            <div className="acceptedorder__text__container">
                <Card.Text className="acceptedorder__text">Restaurant Address : vfdbfbeb</Card.Text>
                <Card.Text className="acceptedorder__text">Customer Address : vfdbfbeb</Card.Text>
                <Card.Text className="acceptedorder__text">Total Order Items : 5</Card.Text>
                <Card.Text className="acceptedorder__text">Total Order Amount : 500</Card.Text>
                <Card.Text className="acceptedorder__text">Order Status : Preparing</Card.Text>
            </div>
        </Card>
      </div>
    </>
  );
};

export default AcceptedOrders;
