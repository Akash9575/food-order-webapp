import React from "react";
import { Table } from "../react-bootstrap/component";

const DUMMY_Restaurants = [
  {
    id: "1",
    email: "abhay@gmail.com",
    username: "abhay",
    city: 'Rajkot',
  },
  {
    id: "2",
    email: "abhay@gmail.com",
    username: "abhay",
    city: 'Rajkot',
  },
  {
    id: "3",
    email: "abhay@gmail.com",
    username: "abhay",
    city: 'Rajkot',
  },
  {
    id: "4",
    email: "abhay@gmail.com",
    username: "abhay",
    city: 'Rajkot',
  },
  {
    id: "5",
    email: "abhay@gmail.com",
    username: "abhay",
    city: 'Rajkot',
  },
  {
    id: "6",
    email: "abhay@gmail.com",
    username: "abhay",
    city: 'Rajkot',
  },
  {
    id: "7",
    email: "abhay@gmail.com",
    username: "abhay",
    city: 'Rajkot',
  },
];

const DeliveryMen = () => {
  return (
    <>
      <div className="m-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_Restaurants.map((deliveryman) => (
              <tr key={deliveryman.id}>
                <td>{deliveryman.id}</td>
                <td>{deliveryman.username}</td>
                <td>{deliveryman.email}</td>
                <td>{deliveryman.city}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DeliveryMen;
