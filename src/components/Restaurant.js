import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button } from "../react-bootstrap/component";
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { CartAction } from '../store/cart-slice'
import {DummyItemsData, options} from '../constants/constant'
import '../styles/Restaurant.css'

const Restaurant = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const location = useLocation();
    const [val, setVal] = useState(0)
    const [allItemData, setAllItemData] = useState([])
    const [categoriesData, setCategoriesData] = useState([])
    const [categories, setCategories] = useState('')
    const { item } = location.state

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        const RestaurantItems = DummyItemsData.filter((food) => food.restaurant_id == item.restaurant_id)
        setAllItemData(RestaurantItems)
        setCategoriesData(RestaurantItems)
    }, [])

    useEffect(() => {
        if (categories == "AllItem") {
            setCategoriesData(allItemData)
        }
        else if (val == 1) {
            const RestaurantCategoriesItems = allItemData.filter((food) => food.item_category.toLowerCase().includes(categories.toLowerCase()))
            setCategoriesData(RestaurantCategoriesItems)
        }
        setVal(1);
    }, [categories])

    const HandleCategories = (e) => {
        setCategories(e.value)
    }

    const AddItemHandler = (foodItem) => {
        if(isLoggedIn)
        {
            dispatch(CartAction.addItemtoCart({
                id:foodItem.item_id,
                title:foodItem.item_name,
                price:foodItem.item_price
            }))
        }
        else{
            alert('Please Login');
            navigate('/login');
        }
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
                <Select options={options} onChange={HandleCategories} defaultValue={options[0]} />
            </div>

            <div className='foodItems'>
                { categoriesData.map((foodItem) =>
                        <Card style={{ width: '50%' }}>
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
                                        <Button onClick={() => AddItemHandler(foodItem)}>Add to Cart</Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    )}
            </div>

        </>
    )
}

export default Restaurant