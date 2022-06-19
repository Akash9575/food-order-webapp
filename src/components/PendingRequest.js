import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./PendingRequest.css";

const dummy_data = [
  {
    restaurant_id: "1",
    restaurant_image:
      "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
    restaurant_name: "abc",
    restaurant_email: "abc@gmail.com",
    restaurant_contact_number: "543534643643",
    restaurant_address: "bghfhf",
    restaurant_city: "ghh",
    restaurant_description: "fhghfh",
  },
  {
    restaurant_id: "2",
    restaurant_image:
      "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
    restaurant_name: "abc",
    restaurant_email: "abc@gmail.com",
    restaurant_contact_number: "543534643643",
    restaurant_address: "bghfhf",
    restaurant_city: "ghh",
    restaurant_description: "fhghfh",
  },
  {
    restaurant_id: "3",
    restaurant_image:
      "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
    restaurant_name: "abc",
    restaurant_email: "abc@gmail.com",
    restaurant_contact_number: "543534643643",
    restaurant_address: "bghfhf",
    restaurant_city: "ghh",
    restaurant_description: "fhghfh",
  },
  {
    restaurant_id: "4",
    restaurant_image:
      "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
    restaurant_name: "abc",
    restaurant_email: "abc@gmail.com",
    restaurant_contact_number: "543534643643",
    restaurant_address: "bghfhf",
    restaurant_city: "ghh",
    restaurant_description: "fhghfh",
  },
  {
    restaurant_id: "5",
    restaurant_image:
      "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
    restaurant_name: "abc",
    restaurant_email: "abc@gmail.com",
    restaurant_contact_number: "543534643643",
    restaurant_address: "bghfhf",
    restaurant_city: "ghh",
    restaurant_description: "fhghfh",
  },
  {
    restaurant_id: "6",
    restaurant_image:
      "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
    restaurant_name: "abc",
    restaurant_email: "abc@gmail.com",
    restaurant_contact_number: "543534643643",
    restaurant_address: "bghfhf",
    restaurant_city: "ghh",
    restaurant_description: "fhghfh",
  },
  {
    restaurant_id: "7",
    restaurant_image:
      "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
    restaurant_name: "abc",
    restaurant_email: "abc@gmail.com",
    restaurant_contact_number: "543534643643",
    restaurant_address: "bghfhf",
    restaurant_city: "ghh",
    restaurant_description: "fhghfh",
  },
];

const PendingRequest = () => {
  const [data, setData] = useState(dummy_data);

  useEffect(() => {
    // fetch("/pendingrequest", {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("jwt"),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     // console.log(result.result);
    //     setData(result.result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  let status = "Pending";

  const Approved = (ApprovedId) => {
    //   status = "Approved";
    //   fetch("/approvedrequest",{
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer "+localStorage.getItem("jwt")
    //       },
    //       body: JSON.stringify({
    //         status: status,
    //         approvedid: ApprovedId
    //       })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //       // console.log(data);
    //       if(data.error)
    //       {
    //         // alert(data.error);
    //         toast.error(data.error, {
    //           theme: 'colored',
    //           type: 'error'
    //         });
    //       }
    //       else{
    //         // alert(data.msg);
    //         toast.success(data.msg, {
    //           theme: 'colored',
    //           type: 'success'
    //         });
    //       }
    //     }).catch((err) => {
    //       console.log(err);
    //     });
  };

  const Rejected = (RejectedId) => {
    //   status = "Rejected";
    //   fetch("/rejectedrequest",{
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer "+localStorage.getItem("jwt")
    //       },
    //       body: JSON.stringify({
    //         status: status,
    //         rejectedid: RejectedId
    //       })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //       // console.log(data);
    //       if(data.error)
    //       {
    //         // alert(data.error);
    //         toast.error(data.error, {
    //           theme: 'colored',
    //           type: 'error'
    //         });
    //       }
    //       else{
    //         // alert(data.msg);
    //         toast.success(data.msg, {
    //           theme: 'colored',
    //           type: 'success'
    //         });
    //       }
    //     }).catch((err) => {
    //       console.log(err);
    //     });
  };

  return (
    <>
      <div className="container-fluid col-10 main-container">
        <h1 className="text-center my-3 title">Pending Requests</h1>
        <div className="col-12 my-5 d-flex flex-wrap justify-content-evenly">
          <Row xs={1} md={2} className="g-4">
            {data.map((item) => {
              const {
                restaurant_id,
                restaurant_image,
                restaurant_name,
                restaurant_email,
                restaurant_address,
                restaurant_city,
                restaurant_contact_number,
                restaurant_description,
              } = item;
              return (
                <>
                  <Col className='card_column'>
                    <Card
                      bg="warning"
                      key={restaurant_id}
                      text="dark"
                      className="mb-2 request_card"
                    >
                      <Card.Img
                        variant="top"
                        src={restaurant_image}
                        className="request_card_img"
                      />
                      <Card.Body>
                        <Card.Title>
                          <h3>{restaurant_name}</h3>
                        </Card.Title>
                        <Card.Text className="card_text">
                          Restaurant Email : {restaurant_email}
                        </Card.Text>
                        <Card.Text className="card_text">
                          Restaurant Address : {restaurant_address}
                        </Card.Text>
                        <Card.Text className="card_text">
                          Restaurant City : {restaurant_city}
                        </Card.Text>
                        <Card.Text className="card_text">
                          Restaurant Contact Number :{" "}
                          {restaurant_contact_number}
                        </Card.Text>
                        <Card.Text className="card_text">
                          Restaurant Description : {restaurant_description}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="d-flex flex-wrap justify-content-evenly align-content-center py-3">
                        <Button variant="danger">Reject</Button>
                        <Button variant="success">Approve</Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default PendingRequest;
