import { CartAction } from "./Cart-reducer";

export const sendCartData =  (cart) =>{
    return async dispatch => {
        const sendData = async () => {
            const response = await fetch('https://ownredux-346ea-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                body: JSON.stringify({
                    items:{...cart.items},
                    totalCartPrice:cart.totalCartPrice,
                    totalQuantity:cart.totalQuantity
                })
            })
            if(!response.ok){
                throw new Error("There is an Error Can't send data..")
            }
        }
        sendData();
    }
} 

export const fetchCartData = () => {
    return async dispatch  =>{
        const fetchData = async () => {
            const response = await fetch("https://ownredux-346ea-default-rtdb.firebaseio.com/cart.json")
            if(!response.ok){
                throw new Error("there is an error, can't fetch data")
            }
            const responeData = await response.json()
            return responeData
        }
        const data = await fetchData()

          dispatch(CartAction.replaceCartData({
            items: data.items || [],
            totalQuantity: data.totalQuantity
        }))
    }
}