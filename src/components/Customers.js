import React from "react";
import {Table} from '../react-bootstrap/component'

const DUMMY_Restaurants = [
  {
    id: "1",
    email: "abhay@gmail.com",
    username: "abhay",
  },
  {
    id: "2",
    email: "abhay@gmail.com",
    username: "abhay",
  },
  {
    id: "3",
    email: "abhay@gmail.com",
    username: "abhay",
  },
  {
    id: "4",
    email: "abhay@gmail.com",
    username: "abhay",
  },
  {
    id: "5",
    email: "abhay@gmail.com",
    username: "abhay",
  },
  {
    id: "6",
    email: "abhay@gmail.com",
    username: "abhay",
  },
  {
    id: "7",
    email: "abhay@gmail.com",
    username: "abhay",
  },
];

const Customers = () => {
  return (
    <>
      <div className="m-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_Restaurants.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Customers;