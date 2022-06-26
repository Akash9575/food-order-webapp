import { CartAction } from "../slices/cart-slice";
import { base_url } from "../../urls/url";

export const fetchCartData = (user_id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${base_url}/api/v1/carts?user_id=${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("there is an error, can't fetch data");
      }
      const responeData = await response.json();
      return responeData;
    };
    const data = await fetchData();

    let cartitems = [];
    for (let key in data.cart_obj.cartitem) {
      cartitems.push(data.cart_obj.cartitem[key]);
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

export const sendCartData = (cart, user_id) => {
  return async (dispatch) => {
    const sendData = async () => {
      try {
        const response = await fetch(`${base_url}/api/v1/carts/${user_id}`, {
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
          }),
        });
        if (!response.ok) {
          throw new Error("There is an Error Can't send data..")
        }
      } catch (err) {
        console.log(err);
      }
    };
    sendData();
  };
};