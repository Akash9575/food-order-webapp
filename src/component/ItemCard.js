import React from "react";
import { Card, CardGroup, Row, Col } from "../react-bootstrap/component";
import "../styles/ItemCard.css";

const ItemCard = () => {
  return (
    <>
      <CardGroup classname="cardgroup__container">
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
      </CardGroup>
    </>
  );
};

export default ItemCard;
