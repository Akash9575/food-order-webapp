import React, { useEffect } from 'react'
import { Table, Card, Badge, Row, Col , Button } from 'react-bootstrap'
import { useState } from 'react'
import './Request.css'


const Request = () => {

    const [order,setOrder] = useState(
        [ {
        order_id:"1",
        items:[{
            item_id:"1",
            item_name:"panner",
            item_price:"20",
            item_quantity:"4"
        },
        {
            item_id:"2",
            item_name:"pani puri",
            item_price:"40",
            item_quantity:"5"
        },],
        totalPrice:"90",
        totoalQunatity:"9",
        address:"anslanasn sansna naknoioicsn najcnwnkla"
    },
    {
        order_id:"1",
        items:[{
            item_id:"1",
            item_name:"panner",
            item_price:"20",
            item_quantity:"4"
        },
        {
            item_id:"2",
            item_name:"pani puri",
            item_price:"40",
            item_quantity:"5"
        },],
        totalPrice:"90",
        totoalQunatity:"9",
        address:"anslanasn sansna naknoioicsn najcnwnkla"
    },
    {
        order_id:"1",
        items:[{
            item_id:"1",
            item_name:"panner",
            item_price:"20",
            item_quantity:"4"
        },
        {
            item_id:"2",
            item_name:"pani puri",
            item_price:"40",
            item_quantity:"5"
        },],
        totalPrice:"90",
        totoalQunatity:"9",
        address:"anslanasn sansna naknoioicsn najcnwnkla"
    },
    {
        order_id:"5",
        items:[{
            item_id:"1",
            item_name:"panner",
            item_price:"20",
            item_quantity:"4"
        },
        {
            item_id:"2",
            item_name:"pani puri",
            item_price:"40",
            item_quantity:"5"
        },],
        totalPrice:"90",
        totoalQunatity:"9",
        address:"anslanasn sansna naknoioicsn najcnwnkla"
    },

])

 useEffect(() => {
        
},[])



 const handelAcceptOrder = (order) => {
    console.log(order)
 }
 
  return (
    <>
         <Row xs={1} md={2} lg={3} className="g-4 request_row"  >
          {
            order.length > 0 ?
            order.map((orderItem) => 
            <Col>
            <Card className='request_card'>
              <Card.Body>
                <Card.Title>
                    Order
                </Card.Title>
                <Card.Text>
                {/* <h4>Food Items:</h4> */}
                {orderItem.items.map((foodItem) => (
                        <>
                        <div>
                        <h2>{foodItem.item_quantity} {foodItem.item_name} </h2>
                        </div>
                        </>
                    ))}
                </Card.Text>
                <Card.Text style={{fontSize:"20px"}}>
                    Address : {orderItem.address}
                </Card.Text>
                <Card.Text style={{fontSize:"20px"}}>
                    Total Price : {orderItem.totalPrice}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button onClick={() => handelAcceptOrder(orderItem)}>Accept</Button>
              </Card.Footer>
            </Card>
          </Col>
          ) : <h1>You don't have any Oreder request</h1>
          }
        </Row>


    </>
  )
}

export default Request