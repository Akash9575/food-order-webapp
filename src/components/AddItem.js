import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { cloudinary_upload_url } from "../urls/url";
import { fetch_url } from "../urls/url";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import './AddItem.css'

const AddItem = (props) => {

  const { state } = useLocation();

  const [restaurant_id,setRestaurant_id] = useState(state);
  let navigate = useNavigate();

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [item_secure_url, setItem_Secure_url] = useState("");
  const [validated, setValidated] = useState(false);

  // const user_id = useSelector((state) => state.auth.user_id);

  const [addItemData, setAddItemData] = useState({
    item_name: "",
    item_description: "",
    item_price: "",
    item_category:"fastFood",
    item_status:"available",
    restaurant_id: restaurant_id
    // item_image:''
  })

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }

    console.log(item_secure_url)
    if (item_secure_url) {
      setAddItemData({
        ...addItemData,
        item_secure_url: item_secure_url,
      });
      if (addItemData.item_secure_url) {
        console.log(addItemData.item_secure_url);
        // const response = fetch('https://ownredux-346ea-default-rtdb.firebaseio.com/foodItem.json', {
        //   method: 'POST',
        //   body: JSON.stringify(addItemData),
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // });
        navigateMenu();

        fetch(`${fetch_url}/api/v1/items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
          item_name: addItemData.item_name,
          item_category: addItemData.item_category,
          item_description: addItemData.item_description,
          item_price: addItemData.item_price,
          item_status: addItemData.item_status,
          restaurant_id: restaurant_id,
          item_secure_url: item_secure_url

          }),
        })
          .then((res) => {
            res.json();
            console.log(res);
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [image, item_secure_url, addItemData.item_secure_url]);

  const handleItemChanage = (event) => {
    setAddItemData((oldvlaue) => {
      return { ...oldvlaue, [event.target.name]: event.target.value }
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
    } else {
      uploadItemImage();
      // form.checkValidity = true
    }
    setValidated(true);

  };


  const uploadItemImage = () => {
    if (image === "") return alert("Please upload image");

    const uploadfile = new FormData();
    uploadfile.append("file", image);
    uploadfile.append("upload_preset", "see-radio");
    uploadfile.append("cloud_name", "abhay-parsaniya");
    console.log(uploadfile);

    fetch(cloudinary_upload_url, {
      method: "POST",
      body: uploadfile,
    })
      .then((res) => res.json())
      .then((result) => {
        setItem_Secure_url(result.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChanage = (e) => {
    setImage(e.target.files[0]);
  }

  const navigateMenu = (event) => {
    navigate("../menu");
  }


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
        <Form.Group as={Col} md="6" controlId="validationCustom02">
           <Form.Select name="item_category" onChange={handleItemChanage}>
          <option value="fastFood">Fast Food</option>
          <option value="panjabi">Panjabi</option>
          <option value="chinese">Chinese</option>
          <option value="gujrati">Gujrati</option>
        </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
           <Form.Select name="item_categorie" onChange={handleItemChanage}>
          <option value="available">Available</option>
          <option value="not_available">Not available</option>
        </Form.Select>
        </Form.Group>
      </Row>


     
      <Row className="mb-12 p-4">
              {/* <img
                    src={preview}
                    alt="No Selected"
                    className="restaurant_form_image"
                  /> */}
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>Food image</Form.Label>
          <Form.Control
            required
            onChange={handleImageChanage}
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