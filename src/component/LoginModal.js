import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Button, Modal, Form, Row, Col } from "../react-bootstrap/component";
import "./AuthModal.css";
import axios from "axios";

export default function LoginModal(props) {
  const [validated, setValidated] = useState(false);
  const [login_data, setLogin_data] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

      axios.post(`https://e293-103-240-35-190.in.ngrok.io/users/sign_in`, { user: login_data })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          localStorage.setItem("token", res.headers.authorization);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          alert(res.data.message);
          navigate("/");
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

  // const [show, setShow] = useState(true);
  // const [validated, setValidated] = useState(false);
  // const [login_data, setLogin_data] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //   } else {
  //     // console.log(login_data);
  //     fetch("", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         login_data: login_data,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log(data);
  //         if (data.error) {
  //           alert(data.error);
  //         } else {
  //           localStorage.setItem("jwt", data.token);
  //           localStorage.setItem("user", JSON.stringify(data.user));
  //           alert("signed in success !!");
  //           // navigate("/requestprogress");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     // handleClose();
  //   }
  //   setValidated(true);
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setLogin_data({ ...login_data, [name]: value });
  // };

  // const handleClose = () => setShow(false);

  // return (
  //   <>
  //     {(
  //       <Modal
  //         show={show}
  //         onHide={handleClose}
  //         size="md"
  //         aria-labelledby="contained-modal-title-vcenter"
  //         centered
  //       >
  //         <Modal.Header closeButton>
  //           <Modal.Title className="mx-auto">Login</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Form noValidate validated={validated} onSubmit={handleSubmit}>
  //             <Row className="mb-3">
  //               <Form.Group as={Col} controlId="validationCustomUsername">
  //                 <Form.Label>Username</Form.Label>
  //                   <Form.Control
  //                     type="text"
  //                     placeholder="Username"
  //                     aria-describedby="inputGroupPrepend"
  //                     name="username"
  //                     onChange={handleChange}
  //                     required
  //                   />
  //                   <Form.Control.Feedback type="invalid">
  //                     Please Enter a username.
  //                   </Form.Control.Feedback>
  //               </Form.Group>
  //             </Row>
  //             <Row className="mb-3">
  //               <Form.Group as={Col} controlId="validationCustom03">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control
  //                   type="password"
  //                   placeholder="Password"
  //                   name="password"
  //                   onChange={handleChange}
  //                   required
  //                 />
  //                 <Form.Control.Feedback type="invalid">
  //                   Please Enter a Password.
  //                 </Form.Control.Feedback>
  //               </Form.Group>
  //             </Row>
  //             <Modal.Footer>
  //               <Button variant="danger" onClick={handleClose}>
  //                 Close
  //               </Button>
  //               <Button variant="success" type="submit">
  //                 Login
  //               </Button>
  //             </Modal.Footer>
  //           </Form>
  //         </Modal.Body>
  //       </Modal>
  //     )}
  //   </>
  // );
}
