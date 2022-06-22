import { CartAction } from "./cart-slice";
import { fetch_url } from "../urls/url";

export const sendCartData = (cart, user_id) => {
  return async (dispatch) => {
    const sendData = async () => {
      console.log("dfdfs");
      try {
        // console.log(JSON.stringify({
        //     cart_obj: {
        //       cartitem: {...cart.items},
        //       totalCartPrice: cart.totalCartPrice,
        //       totalQuantity: cart.totalQuantity,
        //     },
        // }),)
        const response = await fetch(`${fetch_url}/api/v1/carts/${user_id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            cart_obj: {
              cartitem: { ...cart.items },
              totalCartPrice: cart.totalCartPrice,
              totalQuantity: cart.totalQuantity,
            },
            //   user_id: 9
          }),
        });
        if (!response.ok) {
          // throw new Error("There is an Error Can't send data..")
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
  };
};

export const fetchCartData = (user_id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${fetch_url}/api/v1/carts?user_id=${user_id}`, {
        method: "GET",
        headers: {
        "Content-type": 'application/json',
          Authorization: localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("there is an error, can't fetch data");
      }
      const responeData = await response.json();
      console.log(responeData)
      return responeData;
    };
    const data = await fetchData();
    console.log(data.cart_obj.cartitem);
    let cartitems = [];
    for (let key in data.cart_obj.cartitem){
      console.log(data.cart_obj.cartitem[key])
      cartitems.push(data.cart_obj.cartitem[key])
      console.log(cartitems);
    }
    dispatch(
      CartAction.replaceCartData({
        items: [...cartitems] || [],
        totalQuantity: data.cart_obj.totalQuantity,
        totalCartPrice: data.cart_obj.totalCartPrice,
      })
    );
  };
};

export const sendOrderData = (order) => {
  return async (dispatch) => {
    const sendOrder = async () => {
      const response = await fetch(
        "https://ownredux-346ea-default-rtdb.firebaseio.com/cart.json",
        {
          method: "POST",
          body: JSON.stringify({
            order,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("There is an Error Can't send order data..");
      }
    };
    sendOrder();
  };
};
