import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Card, CardGroup, Row, Col, Badge } from "../react-bootstrap/component";
import Select from 'react-select'
import '../styles/Restaurant.css'

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
    {
        "item_id": 3,
        "item_name": "Pani puri",
        "item_price": "20",
        "item_category": "Gujrati",
        "item_status": "true",
        "item_image_url": "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png",
        "item_description": "good items",
        "created_at": "2022-06-15T05:42:15.932Z",
        "updated_at": "2022-06-15T05:42:15.932Z",
        "restaurant_id": 2
    }

]

const options = [
    { value: 'AllItem', label: 'All Item' },
    { value: 'Panjabi', label: 'Panjabi' },
    { value: 'Gujrati', label: 'Gujrati' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'FastFood', label: 'Fast Food' },
  ]

const Restaurant = () => {
    const location = useLocation();
    const [val,setVal] = useState(0)
    const [allItemData, setAllItemData] = useState([])
    const [categoriesData, setCategoriesData] = useState([])
    const [categories , setCategories] = useState('')
    const { item } = location.state

    useEffect(() => {
        const RestaurantItems = DummyItemsData.filter((food) => food.restaurant_id == item.restaurant_id)
        setAllItemData(RestaurantItems)
        setCategoriesData(RestaurantItems)
    }, [])

    useEffect(() => {
        if(categories == "AllItem")
        {
          setCategoriesData(allItemData)
        }
        else if(val==1){
            const RestaurantCategoriesItems = allItemData.filter((food) => food.item_category.toLowerCase().includes(categories.toLowerCase()))
            setCategoriesData(RestaurantCategoriesItems)
        }
        setVal(1);
    },[categories])

    const HandleCategories = (e) => {
        setCategories(e.value)
    }

    return (
        <>
            <img
                className="background__image"
                src={item.restaurant_image_url}
                alt="Something Went Wrong"
            />
            <div className="header_fooditem">
                <h1 style={{ fontSize: "50px" }}>{item.restaurant_name}</h1>
                <h3>{item.restaurant_description}</h3>
            </div>

            <div>
            <Select options={options} onChange={HandleCategories}   defaultValue={options[0]}/>
            </div>

            <div className='foodItems'>
            {
              categoriesData.map((foodItem) => 
                 <Card style={{ width: '50%'}}>
                 <Row className='no-gutters'>
                     <Col md={5} lg={5}  >
                         <Card.Img variant="top" src={foodItem.item_image_url} />
                     </Col>
                     <Col>
                         <Card.Body>
                             <Card.Title>{foodItem.item_name}</Card.Title>
                             <Card.Text>
                                 {foodItem.item_description}
                             </Card.Text>
                             {/* <Button variant="primary">Go somewhere</Button> */}
                             <h2>helo</h2>
                         </Card.Body>
                     </Col>
                 </Row>
             </Card>
            ) }
           </div>

        </>
    )
}

export default Restaurant