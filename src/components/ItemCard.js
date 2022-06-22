import React, { useEffect, useState } from "react";
import { Card, CardGroup, Row, Col , Badge } from "../react-bootstrap/component";
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from "react-router-dom";
import "../styles/ItemCard.css";

const DummyJsonData = [
  {
      "restaurant_id": 1,
      "restaurant_status": 'close',
      "restaurant_rating": '4.5',
      "restaurant_name": "Arpit Restaurant",
      "restaurant_address": "Balitha , Ahmedabad",
      "restaurant_contact_number": "6351081845",
      "restaurant_description": "Good restaurant",
      "restaurant_city": "Ahmedabad",
      "restaurant_email": "akash@gamail.com",
      "restaurant_image_url": "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
      "created_at": "2022-06-15T05:41:36.751Z",
      "updated_at": "2022-06-15T05:41:36.751Z"
  },
  {
    "restaurant_id": 2,
    "restaurant_name": "Arpit Restaurant",
    "restaurant_rating": '4.2',
    "restaurant_address": "Balitha , Ahmedabad",
    "restaurant_contact_number": "6351081845",
    "restaurant_description": "Good restaurant",
    "restaurant_city": "Ahmedabad",
    "restaurant_email": "akash@gamail.com",
    "restaurant_image_url": "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
    "restaurant_status": 'open',
    "created_at": "2022-06-15T05:41:36.751Z",
    "updated_at": "2022-06-15T05:41:36.751Z"
},

  {
      "restaurant_id": 3,
      "restaurant_status": 'close',
      "restaurant_rating": '3.2',
      "restaurant_name": "Akash Restaurant",
      "restaurant_address": "Balitha , Mumbai",
      "restaurant_contact_number": "6351081845",
      "restaurant_description": "Good restaurant",
      "restaurant_city": "Mumbai",
      "restaurant_email": "akash@gamail.com",
      "restaurant_image_url": "https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000",
      "created_at": "2022-06-15T05:41:36.751Z",
      "updated_at": "2022-06-15T05:41:36.751Z"
  }
]

var a = 0;
const ItemCard = (props) => {

  const [allRestaurantData,setAllRestaurantData] = useState(DummyJsonData)
  const [cityViseRestaurant,setCityViseRestaurant] = useState(DummyJsonData)
  const [searchData,setSearchData] = useState(DummyJsonData)

  useEffect(() => {

      // const fetchData = async () => {
      //     const response = await fetch("link");
      //     if(!response.ok){
      //       throw new Error("Somthing went wrong")
      //     }
      //     const data = await response.json();

      //     setAllRestaurantData(data);
      //     setCityViseRestaurant(data);
      //     setSearchData(data);
      // }

      // fetchData().catch((err) => {
      //   console.log(err)
      // })
  },[])

  let navigate = useNavigate();

  useEffect(() => {
   if(a==1)
  {
    const cityRestaurant = allRestaurantData.filter((item) => item.restaurant_city == props.city)    
    setCityViseRestaurant(cityRestaurant)
    setSearchData(cityRestaurant)
  }
    a=1;
  },[props.city])

  useEffect(() => {
    console.log(props.search)
      let matches = searchData.filter((item) => {
        return item.restaurant_name.toLowerCase().includes(props.search.toLowerCase())
      })
      setCityViseRestaurant(matches)
  },[props.search])

  const selectRestaurant = (item) => {
    navigate(`/${item.restaurant_name}`, {state:{item}})
  }

  return (
    <>
        <Row xs={1} md={2} lg={3} className="g-4 cardgroup__container">
          {
            cityViseRestaurant.length > 0 ?
            cityViseRestaurant.map((item) => 
            <Col>
            <Card className="card" onClick={() => selectRestaurant(item)}>
              <Card.Img className='card-img-top' variant="top" src={item.restaurant_image_url} />
              <Card.Body>
                <Card.Title>{item.restaurant_name}</Card.Title>
                <Card.Text>
                  {item.restaurant_description}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="footer">
               
                  {item.restaurant_status == 'open' ?
                    <Badge pill style={{ fontSize: '15px' }} bg="primary">open</Badge>
                  :  <Badge pill style={{ fontSize: '15px' }} bg="secondary">close</Badge>
                  }
                  <small className="text-muted">{item.restaurant_city} </small>
                  <Badge bg="warning" style={{ fontSize: '15px' }} text="dark">{item.restaurant_rating} <StarIcon fontSize="small" /></Badge>
              </Card.Footer>
            </Card>
          </Col>
          ) : <h1>There are no restaurant available</h1>
          }
        </Row>
    {/* =================================================== */}
      {/* <CardGroup classname="cardgroup__container">
        <Row xs={1} md={2} lg={3} className="g-4">
          <Col>
            <Card classname="card">
              <Card.Img className='card-img-top' variant="top" src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card classname="card">
              <Card.Img className='card-img-top' variant="top" src="https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/305133437/burger-king-spread.jpg?quality=82&strip=1" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.{" "}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card classname="card">
              <Card.Img className='card-img-top' variant="top" src="https://i.pinimg.com/originals/7a/05/45/7a05459be80a8587e9abe3bb3e6b7c33.jpg" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card classname="card">
              <Card.Img className='card-img-top' variant="top" src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card classname="card">
              <Card.Img className='card-img-top' variant="top" src="https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/305133437/burger-king-spread.jpg?quality=82&strip=1" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.{" "}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card classname="card">
              <Card.Img className='card-img-top' variant="top" src="https://i.pinimg.com/originals/7a/05/45/7a05459be80a8587e9abe3bb3e6b7c33.jpg" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </CardGroup> */}
    </>
  );
};

export default ItemCard;
