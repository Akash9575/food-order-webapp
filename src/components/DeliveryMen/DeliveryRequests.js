import React, { useEffect , useState } from "react";
import { useDispatch } from "react-redux";
import { base_url } from '../../urls/url';
import { acceptOrderByDeliveryMan } from "../../store/actions/delivery-actions";
import {Table,  Button} from "../../react-bootstrap/component";

const DeliveryRequests = () => {
  const [register_DeliveryMan_status, setRegister_DeliveryMan_Status] = useState();
  const [order_accepted_by_restaurant,setOrder_accepted_by_restaurant] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const user_id = user.id
  let allorder = []

  const dispatch = useDispatch();
  const navigate = useDispatch();

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
    dispatch(acceptOrderByDeliveryMan(order_id));
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
              <th>Total Items</th>
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
