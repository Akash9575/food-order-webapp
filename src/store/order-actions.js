import { OrderAction } from "./order-slice";
import { fetch_url } from "../urls/url";

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