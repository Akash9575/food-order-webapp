import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AuthAction} from '../store/auth-slice.js'
import { Button, Form, Row, Col } from "../react-bootstrap/component";
import { fetch_url } from "../urls/url";
import axios from "axios";
import "../styles/AuthModal.css";

export default function LoginModal(props) {
  const [validated, setValidated] = useState(false);
  const [login_data, setLogin_data] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role)

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

      axios.post(`${fetch_url}/users/sign_in`, { user: login_data })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          dispatch(AuthAction.setToken({token: res.headers.authorization, user: res.data.user}))
          dispatch(AuthAction.checkLogin());
          alert(res.data.message);
          // console.log(role);
          if(role === "Restaurant Owner") navigate('/menu')
          else if(role === "Customer") navigate('/')
          else if(role === "Delivery Men") navigate('/deliveryrequests')
        } else {
          alert("Invalid Username or Password");
        }
      })
      .catch(err => console.log(err));
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
          className="form"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <h1 className="mb-5">Login</h1>
          <Row className="my-3">
            <Form.Group as={Col} controlId="validationCustomUsername">
              <Form.Label className="form_label">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="email"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback
                className="form_control_feedback"
                type="invalid"
              >
                Please Enter a Username.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col} controlId="validationCustom03">
              <Form.Label className="form_label">Password</Form.Label>
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
          <Button variant="success" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
