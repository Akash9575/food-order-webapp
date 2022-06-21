import { Navigate, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Protected = ({ Component, role }) => {
  const navigate = useNavigate();

  let isLoggedIn = false;
  localStorage.getItem("token") ? isLoggedIn=true : isLoggedIn=false;

  const user = JSON.parse(localStorage.getItem("user"));
  const user_role = user.role;

  useEffect(() => {
    if (!isLoggedIn || (user_role !== role)) {
      console.log(!isLoggedIn && (user_role !== role))
      navigate("/");
    }
  }, []);
  return(
    <>
      <Component />
    </>
  )
};

export default Protected;
