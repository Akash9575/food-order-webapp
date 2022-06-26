export const USER_ROLES = {
  RESTURANT_OWNER : "Restaurant Owner",
  CUSTOMER : "Customer",
  DELIVERY_MEN : "Delivery Men"
}

export const END_POINTS = {
  BASE: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESTAURANT_NAME: "/:restaurant_name",
  ORDER_REQUEST: "/request",
  RESTAURANT_MENU: "/menu",
  REGISTER_RESTAURANT: "/registerrestaurant",
  ADD_ITEM: "/addItem",
  DELIVERY_REQUESTS: "/deliveryrequests",
  REGISTER_DELIVERY_MEN: "/registerdeliverymen",
  ACCEPTED_ORDERS: "/acceptedorders",
  CUSTOMER_ORDERS: "/customerorders",
  CUSTOMER_PROGRESS_BAR: '/progressbar',
};

export const FOOD_CATEGORY = [
  { value: "AllItem", label: "All Item" },
  { value: "Panjabi", label: "Punjabi" },
  { value: "Gujrati", label: "Gujarati" },
  { value: "Chinese", label: "Chinese" },
  { value: "fastFood", label: "Fast Food" },
];

export const FOOD_TYPE = [
  { value: "veg", label: "Veg" },
  { value: "non veg", label: "Non Veg" },
]

export const CITY_OPTIONS = [
  { value: "Mumbai", label: "Mumbai"},
  { value: "Delhi", label: "Delhi"},
  { value: "Bengaluru", label: "Bengaluru"},
  { value: "Hyberabad", label: "Hyberabad"},
  { value: "Ahmedabad", label: "Ahmedabad"},
  { value: "Chandigarh", label: "Chandigarh"},
  { value: "Chennai", label: "Chennai"},
  { value: "Pune", label: "Pune"},
  { value: "Kolkata", label: "Kolkata"},
  { value: "Kochi", label: "Kochi"},
]