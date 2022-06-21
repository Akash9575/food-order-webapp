import { Navigate, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Protected = ({ Component, role }) => {
  const navigate = useNavigate();
  
  const isLoggedIn = localStorage.getItem("token");
  const user_role = useSelector((state) => state.auth.role);
  console.log(user_role);

  useEffect(() => {
    if (!isLoggedIn || (user_role !== role)) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return(
    <>
      <Component />
    </>
  )
};

export default Protected;
