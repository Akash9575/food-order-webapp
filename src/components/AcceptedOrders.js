import React, { useEffect , useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { fetch_url } from '../urls/url';
import { useSelector } from "react-redux/es/exports";

const AcceptedOrders = () => {

  // const [registerMsg , setRegisterMsg] = useState("")
  const [register_DeliveryMan_status, setRegister_DeliveryMan_Status] = useState();
  const [order_accepted_by_restaurant,setOrder_accepted_by_restaurant] = useState([])
  // const user_id = useSelector((state) => state.auth.user_id);
  const user = JSON.parse(localStorage.getItem("user"))
  const user_id = user.id
  let allorder = []

  useEffect(() => {

    // console.log(user_id)
    console.log("he")
    fetch(`${fetch_url}/api/v1/deliveries?user_id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:  localStorage.getItem("token") },
    })
      .then((res) =>  res.json())
      .then((data) => {

        setRegister_DeliveryMan_Status(data[0].delivery_status)
        // console.log(data[0].delivery_status); 
        // if (data) {
        //   setRestaurant_id(data.id)
        //   if(data.status==false || data.status==true){
        //     console.log(data.status)
        //     setRegister_Restaurant_Status(data.status);
        //   }
        //   if(data.message){
        //     setRegisterMsg(data.message)
        //   }
        //   if(data.items){
        //     console.log("helo")
        //     setAllRestaurantItem(data.items)
        //   }
        // } else {
        //   alert(data.msg);
        // }
      })
      .catch((err) => {
        console.log(err);
      });


      fetch(`${fetch_url}/api/v1/orders/?user_id=${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:  localStorage.getItem("token") },
      })
        .then((res) =>  res.json())
        .then((data) => {
          console.log(data)
          // setAllOrder(data)
          
          allorder = [...data]
          
          setOrder_accepted_by_restaurant(
            allorder.filter((item) => {
              return item.status == "Accepted by Delivery man"
             })
          )
        })
        .catch((err) => {
          console.log(err);
        });

  },[])

  const handelAcceptOrder = (order_id) => {
    console.log(order_id);
    fetch(`${fetch_url}/api/v1/orders/${order_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        status: "Delivered",
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
              console.log(order)
              const {
                id,
                address,
                // restaurant_address, 
                item_quantity,
                total_price,
              } = order;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>restaurant_address</td>
                  <td>{address}</td>
                  <td>{item_quantity}</td>
                  <td>{total_price}</td>
                  <td>
                    <Button variant="success" onClick={() => handelAcceptOrder(id)}>Delivered</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    :
          <h1 style={{padding:"100px", margin:"100px", backgroundColor:" rgb(183, 191, 191)"}}>Your delivery man register request is pending</h1>
    }
    </>
  );
};

export default AcceptedOrders;
