import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "../react-bootstrap/component";

export default function LoginModal() {
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const [login_data, setLogin_data] = useState({
    username: "",
    email: '',
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // console.log(login_data);
      fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login_data: login_data,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            alert("signed up success !!");
            // navigate("/requestprogress");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      handleClose();
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin_data({ ...login_data, [name]: value });
  };

  const handleClose = () => setShow(false);

  return (
    <>
      {show && (
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
      )}
    </>
  );
}
