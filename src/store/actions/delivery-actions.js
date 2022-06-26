import { base_url } from "../../urls/url";
import { toast } from "react-toastify";
toast.configure();

export const registerDeliveryMan = (deliveryman_data) => {
  return async (dispatch) => {
    const registerMan = async () => {
      const response = await fetch(`${base_url}/api/v1/deliveries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          deliveryman_data,
        }),
      });
      if (!response.ok) {
        throw new Error("There is an Error Can't send order data..");
      }
    };
    const data = await registerMan();
  };
};

export const acceptOrderByDeliveryMan = (order_id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${base_url}/api/v1/orders/${order_id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          status: "Accepted by Delivery man",
        }),
      });
      if (!response.ok) {
        throw new Error("there is an error, can't fetch data");
      }
      const responeData = await response.json();
      if (responeData.status === "SUCCESS") {
        toast.success("Order Accepted !!", {
          theme: "colored",
          type: "success",
        });
      } else {
        toast.error("Order Accept Failed", {
          theme: "colored",
          type: "error",
        });
      }
      return responeData;
    };
    const data = await fetchData();
  };
};
