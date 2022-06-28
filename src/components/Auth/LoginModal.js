import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../store/slices/auth-slice";
import { base_url } from "../../urls/url";
import axios from "axios";
import { USER_ROLES, END_POINTS } from "../../constants/constant";
import { Button, Form, Row, Col } from "../../react-bootstrap/component";
import "../../styles/AuthModal.css";
import { toast } from "react-toastify";
toast.configure();

export default function LoginModal(props) {
  const [validated, setValidated] = useState(false);
  const [login_data, setLogin_data] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.role === USER_ROLES.CUSTOMER) navigate(END_POINTS.BASE);
    else if (user.role === USER_ROLES.RESTURANT_OWNER) navigate(END_POINTS.RESTAURANT_MENU);
    else if (user.role === USER_ROLES.DELIVERY_MEN) navigate(END_POINTS.REGISTER_DELIVERY_MEN);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      axios
        .post(`${base_url}/users/sign_in`, { user: login_data })
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              AuthAction.setToken({
                token: res.headers.authorization,
                user: res.data.user,
              })
            );
            dispatch(AuthAction.checkLogin());
            if (res.data.error) {
              toast.error(res.data.error, {
                theme: "colored",
                type: "error",
              });
            } else {
              toast.success(res.data.message, {
                theme: "colored",
                type: "success",
              });
              checkUserRole();
            }
          }
        })
        .catch((err) => console.log(err));
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin_data({ ...login_data, [name]: value });
  };

  return (
    <>
      <div className="form_container">
        <Form
          className="form w-25"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <h1 className="mb-5">Log In</h1>
          <Row className="my-5">
            <Form.Group as={Col} controlId="validationCustomUsername">
              <Form.Control
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                name="email"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback
                className="form_control_feedback"
                type="invalid"
              >
                Please Enter a Email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="my-5">
            <Form.Group as={Col} controlId="validationCustom03">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback
                className="form_control_feedback"
                type="invalid"
              >
                Please Enter a Password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button variant="dark" className="px-5 py-2" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
