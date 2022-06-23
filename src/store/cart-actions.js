import { CartAction } from "./cart-slice";
import { fetch_url } from "../urls/url";

export const sendCartData = (cart, user_id) => {
  return async (dispatch) => {
    const sendData = async () => {
      try {
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
      const response = await fetch(
        `${fetch_url}/api/v1/carts?user_id=${user_id}`,
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

export const sendOrderData = (order) => {
  return async (dispatch) => {
    const sendOrder = async () => {
      const response = await fetch(`${fetch_url}/api/v1/orders`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          order,
        }),
      });
      if (!response.ok) {
        // throw new Error("There is an Error Can't send order data..");
        console.log(response)
      }
    };
    const data = await sendOrder();
    console.log(data);
  };
};

export const fetchPendingOrders = (user_id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${fetch_url}/api/v1/orders?user_id=7`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        // throw new Error("there is an error, can't fetch data");
        console.log(response)
      }
      const responeData = await response.json();
      console.log(responeData);
      return responeData;
    };
    const data = await fetchData();

    // let cartitems = [];
    // for (let key in data.cart_obj.cartitem) {
    //   console.log(data.cart_obj.cartitem[key]);
    //   cartitems.push(data.cart_obj.cartitem[key]);
    // }
    // dispatch(
    //   CartAction.replaceCartData({
    //     items: [...cartitems] || [],
    //     totalQuantity: data.cart_obj.totalQuantity,
    //     totalCartPrice: data.cart_obj.totalCartPrice,
    //   })
    // );
  };
};