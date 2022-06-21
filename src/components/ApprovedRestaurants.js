import React from "react";
import {Table} from '../react-bootstrap/component'

const DUMMY_Restaurants = [
  {
    id: "1",
    email: "abhay@gmail.com",
    name: "abhay",
    city: 'Rajkot',
    rating: '4.5',
  },
  {
    id: "2",
    email: "abhay@gmail.com",
    name: "abhay",
    city: 'Rajkot',
    rating: '4.5',
  },
  {
    id: "3",
    email: "abhay@gmail.com",
    name: "abhay",
    city: 'Rajkot',
    rating: '4.5',
  },
  {
    id: "4",
    email: "abhay@gmail.com",
    name: "abhay",
    city: 'Rajkot',
    rating: '4.5',
  },
  {
    id: "5",
    email: "abhay@gmail.com",
    name: "abhay",
    city: 'Rajkot',
    rating: '4.5',
  },
  {
    id: "6",
    email: "abhay@gmail.com",
    name: "abhay",
    city: 'Rajkot',
    rating: '4.5',
  },
  {
    id: "7",
    email: "abhay@gmail.com",
    name: "abhay",
    city: 'Rajkot',
    rating: '4.5',
  },
  {
    id: "8",
    email: "abhay@gmail.com",
    name: "abhay",
    city: 'Rajkot',
    rating: '4.5',
  },
];

const ApprovedRestaurants = () => {
  return (
    <>
    <div className="m-5">
      <Table responsive='lg' striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {DUMMY_Restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.id}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.email}</td>
              <td>{restaurant.city}</td>
              <td>{restaurant.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
};

export default ApprovedRestaurants;
