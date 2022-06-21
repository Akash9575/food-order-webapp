import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const dummy_data = [
  {
    id: "1",
    restaurant_address: "ccca",
    customer_address: "dd",
    cart_items: "7",
    total_amount: "1200",
  },
  {
    id: "2",
    restaurant_address: "ccca",
    customer_address: "dd",
    cart_items: "7",
    total_amount: "1200",
  },
  {
    id: "3",
    restaurant_address: "ccca",
    customer_address: "dd",
    cart_items: "7",
    total_amount: "1200",
  },
  {
    id: "4",
    restaurant_address: "ccca",
    customer_address: "dd",
    cart_items: "7",
    total_amount: "1200",
  },
  {
    id: "5",
    restaurant_address: "ccca",
    customer_address: "dd",
    cart_items: "7",
    total_amount: "1200",
  },
];
const DeliveryRequests = () => {
  return (
    <>
      <div className="m-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Restaurant Address</th>
              <th>Customers Address</th>
              <th>Cart Items</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummy_data.map((order) => {
              const {
                id,
                customer_address,
                restaurant_address,
                cart_items,
                total_amount,
              } = order;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{customer_address}</td>
                  <td>{restaurant_address}</td>
                  <td>{cart_items}</td>
                  <td>{total_amount}</td>
                  <td>
                    <Button variant="success">Accept</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DeliveryRequests;
