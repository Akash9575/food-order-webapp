import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { END_POINTS } from "./constants/constant";

const Protected = ({ Component, role }) => {
  const navigate = useNavigate();

  let isLoggedIn = false;
  localStorage.getItem("token") ? (isLoggedIn = true) : (isLoggedIn = false);

  let user_role;
  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem("user"));
    user_role = user.role;
  }

  useEffect(() => {
    // if (!isLoggedIn || (user_role !== role)) {
    //   navigate("/");
    // }
    if (!isLoggedIn) {
      navigate(END_POINTS.BASE);
    } else if (user_role !== role) {
      navigate(END_POINTS.BASE);
    }
  }, []);
  return (
    <>
      <Component />
    </>
  );
};

export default Protected;
