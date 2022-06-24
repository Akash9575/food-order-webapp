import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Button, Form, Row, Col } from "../../react-bootstrap/component";
import { base_url } from "../../urls/url";
import "../../styles/AuthModal.css";
import { toast } from "react-toastify";
toast.configure();

export default function SignUpModal() {
  const [validated, setValidated] = useState(false);
  const [register_data, setRegister_data] = useState({
    name: "",
    email: "",
    contact_number: "",
    role: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (register_data.contact_number.length !== 10) {
      return  toast.error('Contact number Must be 10 digit', {
        theme: "colored",
        type: "error",
      });
    } else if (register_data.password.length < 6) {
      return  toast.error('Password at least 6 char long', {
        theme: "colored",
        type: "error",
      });
    } else if(register_data.role === '' || register_data.role === 'Select Role')
    {
      return toast.error('Please Select Role', {
        theme: "colored",
        type: "error",
      });
    } 
    else {
      fetch(`${base_url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: register_data,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error, {
              theme: "colored",
              type: "error",
            });
          } else {
            toast.success(data.message, {
              theme: "colored",
              type: "success",
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister_data({ ...register_data, [name]: value });
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
          <h1 className="mb-5">Sign Up</h1>
          <Row className="my-3">
            <Form.Group as={Col} controlId="validationCustomUsername">
              <Form.Label className="form_label">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="name"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback
                className="form_control_feedback"
                type="invalid"
              >
                Please Enter a Name
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col} controlId="validationCustomUserEmail">
              <Form.Label className="form_label">Email</Form.Label>
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
                Please Enter an Email
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col} controlId="validationCustomUserContactNumber">
              <Form.Label className="form_label">Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Contact Number"
                aria-describedby="inputGroupPrepend"
                name="contact_number"
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback
                className="form_control_feedback"
                type="invalid"
              >
                Please Enter a Contact Number
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustomSelectUserType">
              <Form.Label className="form_label">Select Type</Form.Label>
              <Form.Select aria-label="Default select example" name="role" onChange={handleChange} >
                <option>Select Role</option>
                <option value="Customer">Customer</option>
                <option value="Delivery Men">Delivery Men</option>
                <option value="Restaurant Owner">Restaurant Owner</option>
              </Form.Select>
              <Form.Control.Feedback
                className="form_control_feedback"
                type="invalid"
              >
                Please Select a User Type
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group as={Col} controlId="validationCustomUserPassword">
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
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </>
  );
}
