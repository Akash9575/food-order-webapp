import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Modal } from 'react-bootstrap'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Form from 'react-bootstrap/Form';
import './StoreMenu.css'
import { useNavigate } from "react-router-dom";

const DummyItemsData = [
    {
        "item_id": 1,
        "item_name": "paneer",
        "item_price": "20",
        "item_category": "Panjabi",
        "item_status": "true",
        "item_description": "good items",
        "item_image_url": "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
        "created_at": "2022-06-15T05:42:15.932Z",
        "updated_at": "2022-06-15T05:42:15.932Z",
        "restaurant_id": 1
    },
    {
        "item_id": 2,
        "item_name": "vada pav",
        "item_price": "20",
        "item_category": "Gujrati",
        "item_status": "true",
        "item_description": "good items",
        "item_image_url": "https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg?w=2000",
        "created_at": "2022-06-15T05:42:15.932Z",
        "updated_at": "2022-06-15T05:42:15.932Z",
        "restaurant_id": 1
    },
]

const StoreMenu = () => {

    let navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false)
    const [validated, setValidated] = useState(false);

    const [allRestaurantItem,setAllRestaurantItem] = useState(DummyItemsData) 

    // useEffect(() => {
      
    //      fetch("",{
    //         method:"post",
    //         headers: {
    //             "authorization" : localStorage.getItem('token'),
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             user_id: '1'
    //         })
    //     }).then(res => res.json())
    //         .then(data => setAllRestaurantItem(data))
    // },[])

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            //   event.preventDefault();
        } else {
            // sendItemData()

            // setAddItemData({
            //     item_name:"",
            //     item_description:"",
            //     item_price:"",
            //     item_image:''
            // })
        }
        setValidated(true);

    };

    const handleEditItem = (e) => {
        setShowEditModal(true)
    }

    const [data,setData] = useState({
      userid: '1',
      msg: 'not registers'
    })

    const handleRestaurnatNavigate = (event) => {
      navigate("../registerrestaurant");
    }

    const handleAddItemNavigate = (event) => {
      navigate("../addItem");
    }

    return (
        <>
        {data.msg == 'not register' ?
          <h1 style={{padding:"200px 100px", margin:"50px", backgroundColor:"gray" }}>You haven't register your restaurant
            <div style={{padding:"20px"}}> <Button onClick={handleRestaurnatNavigate}> Register Your Restaurant</Button></div>
          </h1>
        :
        <>
        <div className='restauntMenu_header'> 
          <h1>Your menu</h1>
          <Button onClick={handleAddItemNavigate}>Add Item</Button>
        </div>
        <div className='restaurantfoodItems'>
        {allRestaurantItem.map((foodItem) => (
            <Card style={{ width: '50%' }} className="m-3 menuItem">
                <Row className='no-gutters'>
                    <Col md={5} lg={5}  >
                        <Card.Img variant="top" className='menuItem_img'
                            src={foodItem.item_image_url}
                        />
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title>
                                {foodItem.item_name}
                            </Card.Title>
                            <Card.Text>
                                {foodItem.item_description}
                            </Card.Text>
                            <ModeEditIcon color="primary" fontSize="large" onClick={handleEditItem} />
                            <DeleteIcon fontSize="large" />
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            ))} 
            </div>
            {showEditModal &&
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Food Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3 p-4">
                       <Form.Group as={Col} md="6" controlId="validationCustom01">
                         <Form.Label>Food item name</Form.Label>
                         <Form.Control
                        //   value={addItemData.item_name}
                          required
                        //   onChange={handleItemChanage}
                          name="item_name"
                          type="text"
                          placeholder="Food item name"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="validationCustom02"> 
                        <Form.Label>Item price</Form.Label>
                        <Form.Control
                          required
                        //   value={addItemData.item_price}
                        //   onChange={handleItemChanage}
                          name="item_price"
                          type="number"
                          placeholder="Enter price"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-12 p-4">
                    <Form.Group as={Col} md="12" controlId="validationCustom02"> 
                        <Form.Label>Food item description</Form.Label>
                        <Form.Control
                          required
                        //   value={addItemData.item_description}      
                        //   onChange={handleItemChanage}
                          name="item_description"
                          as="textarea"
                          type="text"
                          placeholder="Food item description"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-12 p-4">
                    <Form.Group as={Col} md="12" controlId="validationCustom02"> 
                        <Form.Label>Food image</Form.Label>
                        <Form.Control
                          required
                        //   onChange={handleItemChanage}
                        //   value={addItemData.item_image}
                          name="item_image"
                          accept="image/*"
                          type="file"
                          placeholder="Add image"
                        />
                      </Form.Group>
                    </Row>
                    <Button className='m-4' type="submit">Submit form</Button>
                    </Form>

                    </Modal.Body>
                </Modal>
            }
            </>

        }
       

        </>
    )
}

export default StoreMenu