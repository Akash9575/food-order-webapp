import { OrderAction } from "../slices/order-slice";
import { base_url } from "../../urls/url";
import { toast } from "react-toastify";
toast.configure();

export const fetchPendingOrders = (user_id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${base_url}/api/v1/orders?user_id=${user_id}`,
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

    dispatch(
      OrderAction.replacePendingOrderData({
        pending_orders: data || [],
      })
    );
  };
};

export const sendOrderData = (order) => {
  return async (dispatch) => {
    const sendOrder = async () => {
      const response = await fetch(`${base_url}/api/v1/orders`, {
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
        throw new Error("There is an Error Can't send order data..");
      }
    };
    const data = await sendOrder();
  };
};

export const fetchCustomerOrders = (user_id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${base_url}/api/v1/orders/?user_id=${user_id}`, {
        mathod: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      if (!response.ok) {
        throw new Error("there is an error, can't fetch data");
      }
      const responeData = await response.json();
      return responeData;
    };
    const data = await fetchData();

    dispatch(
      OrderAction.replaceCustomerOrderData({
        customer_orders: data || [],
      })
    );
  };
};

export const deliveredOrder = (order_id) => {
  return async (dispatch) => {
    const deliverOrder = async () => {
      const response = await fetch(`${base_url}/api/v1/orders/${order_id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          status: "Delivered",
        }),
      })
      if (!response.ok) {
        throw new Error("There is an Error Can't send order data..");
      }
      else{
        toast.success("Order Delivered !!", {
          theme: "colored",
          type: "success",
        });
      }
    };
    const data = await deliverOrder();
  };
};