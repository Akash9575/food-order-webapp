import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './AddItem.css'

const AddItem = () => {


  const [validated, setValidated] = useState(false);
  const [addItemData,setAddItemData] = useState({
    item_name:"",
    item_description:"",
    item_price:"",
    item_image:''
  })

//   const [itemImage,setItemImage] = useState('')


  const sendItemData = async () => {

    // const formData = new FormData();
    // formData.append('item_image', itemImage );

    // setAddItemData({...addItemData,formData})

    console.log(addItemData)
    const response = await fetch('https://ownredux-346ea-default-rtdb.firebaseio.com/foodItem.json', {
        method: 'POST',
        body: JSON.stringify(addItemData),
        headers:{
          'Content-Type' : 'application/json'
        }
      });
 }
  const handleItemChanage = (event) => {


    setAddItemData((oldvlaue) => {
        return {...oldvlaue,[event.target.name]:event.target.value}
    })
    // if(event.target.name == "item_image"){

    //     console.log(event.target.value)
    //     setAddItemData({...addItemData, ['item_image']: event.target.files[0]})
    // }
    // else{
    //     console.log("hwlo")
    //     setAddItemData((oldvlaue) => {
    //         return {...oldvlaue,[event.target.name]:event.target.value}
    //     })
    // }

  }

  
  const handleSubmit = (event) => {
    const form = event.currentTarget;

   
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    //   event.preventDefault();
    }else{
        sendItemData()
        setAddItemData({
            item_name:"",
            item_description:"",
            item_price:"",
            item_image:''
        })
        // form.checkValidity = true
    }
    setValidated(true);

  };

//   const handleItemImage = (e) => {
//     setItemImage(e.target.files[0])
//   }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="addItemForm">
      <Row className="mb-3 p-4">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Food item name</Form.Label>
          <Form.Control
            value={addItemData.item_name}
            required
            onChange={handleItemChanage}
            name="item_name"
            type="text"
            placeholder="Food item name"
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02"> 
          <Form.Label>Item price</Form.Label>
          <Form.Control
            required
            value={addItemData.item_price}
            onChange={handleItemChanage}
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
            value={addItemData.item_description}      
            onChange={handleItemChanage}
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
            onChange={handleItemChanage}
            value={addItemData.item_image}
            name="item_image"
            accept="image/*"
            type="file"
            placeholder="Add image"
          />
        </Form.Group>
      </Row>
      <Button className='m-4' type="submit">Submit form</Button>
    </Form>
  );
}

export default AddItem