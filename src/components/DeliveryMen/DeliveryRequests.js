import React, { useEffect , useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { base_url } from '../../urls/url';
import { useSelector } from "react-redux/es/exports";

const DeliveryRequests = () => {
  const [register_DeliveryMan_status, setRegister_DeliveryMan_Status] = useState();
  const [order_accepted_by_restaurant,setOrder_accepted_by_restaurant] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const user_id = user.id
  let allorder = []

  useEffect(() => {
    fetch(`${base_url}/api/v1/deliveries?user_id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:  localStorage.getItem("token") },
    })
      .then((res) =>  res.json())
      .then((data) => {
        setRegister_DeliveryMan_Status(data[0].delivery_status)
      })
      .catch((err) => {
        console.log(err);
      });


      fetch(`${base_url}/api/v1/orders/?user_id=${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:  localStorage.getItem("token") },
      })
        .then((res) =>  res.json())
        .then((data) => {
          allorder = [...data]
          setOrder_accepted_by_restaurant(
            allorder.filter((item) => {
              return item.status == "Accepted by Restaurant"
             })
          )
        })
        .catch((err) => {
          console.log(err);
        });

  },[])

  const handelAcceptOrder = (order_id) => {
    fetch(`${base_url}/api/v1/orders/${order_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        status: "Accepted by Delivery man",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
    {register_DeliveryMan_status 
    ? 
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
            {order_accepted_by_restaurant.map((order) => {
              const {
                id,
                address,
                restaurant_address,
                item_quantity,
                total_price,
              } = order;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{restaurant_address}</td>
                  <td>{address}</td>
                  <td>{item_quantity}</td>
                  <td>{total_price}</td>
                  <td>
                    <Button variant="success" onClick={() => handelAcceptOrder(id)}>Accept</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    :
          <h1 style={{padding:"100px", margin:"100px", backgroundColor:" rgb(183, 191, 191)"}}>Your Delivery Man Register Request is Pending</h1>
    }
    </>
  );
};

export default DeliveryRequests;
