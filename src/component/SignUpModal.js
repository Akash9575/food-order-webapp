import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "../react-bootstrap/component";
import './AuthModal.css'

export default function SignUpModal() {
  // const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const [register_data, setRegister_data] = useState({
    name: "",
    contact_number: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else if(register_data.contact_number.length !== 10)
    {
      return alert('Contact number Must be 10 digit')
    }
    else if(register_data.password.length < 6)
    {
      return alert('Password at least 6 char long')
    } else {
      // console.log(login_data);
      fetch("https://e5f0-2405-205-c86a-7de7-db8c-5844-6bc1-df36.in.ngrok.io/users", {
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
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            alert(data.message);
            // navigate("/requestprogress");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // handleClose();
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister_data({ ...register_data, [name]: value });
  };

  // const handleClose = () => setShow(false);

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
                Please Enter a Name.
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
                Please Enter an Email.
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
                Please Enter a Contact Number.
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

      {/* {show && (
        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="mx-auto">Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustomUsername">
                  <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      name="username"
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter a username.
                    </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustomEmail">
                  <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter an Email.
                    </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter a Password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      )} */}
    </>
  );
}
