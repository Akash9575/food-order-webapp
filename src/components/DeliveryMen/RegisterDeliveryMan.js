import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerDeliveryMan } from "../../store/actions/delivery-actions";
import { base_url } from "../../urls/url";
import { CITY_OPTIONS } from "../../constants/constant";
import {Button} from '../../react-bootstrap/component'
import "../../styles/RegisterRestaurant.css";
import { toast } from "react-toastify";
toast.configure();

let a = 0;
const RegisterDeliveryMan = () => {
  const [deliveryman_data, setdeliveryman_data] = useState({});
  const [selectCity, setSelectCity] = useState("Mumbai");
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.auth.user_id);

  const handleCity = (e) => {
    setSelectCity(e.target.value);
  };

  useEffect(() => {
    fetch(`${base_url}/api/v1/deliveries?user_id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data[0].delivery_status);
      })
      .catch((err) => {
        console.log(err);
      });
    if (a == 1) {
      dispatch(registerDeliveryMan(deliveryman_data));
      navigateDeliveryRequest();
    }
    a = 1;
  }, [deliveryman_data]);

  const navigateDeliveryRequest = () => {
    navigate("../deliveryrequests");
  };

  return (
    <>
      {status ? (
        navigateDeliveryRequest()
      ) : (
        <div className="restaurant_background">
          <Formik
            initialValues={{
              deliveryman_name: "",
              deliveryman_email: "",
              deliveryman_number: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.deliveryman_name) {
                errors.deliveryman_name = "Required";
              }
              if (!values.deliveryman_number) {
                errors.deliveryman_number = "Required";
              }
              if (!values.deliveryman_email) {
                errors.deliveryman_email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.deliveryman_email
                )
              ) {
                errors.deliveryman_email = "Invalid Email Address";
              }
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              setdeliveryman_data({
                ...values,
                deliveryman_city: selectCity,
                user_id: user_id,
              });
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="restaurant_form">
                <h2>Register Delivery Man</h2>
                <div className="form-top">
                  <div className="form_control">
                    <div className="restaurant_form_item">
                      <label className="restaurant_form_label">
                        Name{" "}
                      </label>
                      <Field
                        type="text"
                        className="restaurant_form_field"
                        name="deliveryman_name"
                      />
                      <ErrorMessage
                        className="restaurant_form_error"
                        name="deliveryman_name"
                        component="div"
                      />
                    </div>
                    <div className="restaurant_form_item">
                      <label className="restaurant_form_label">Email </label>
                      <Field
                        type="email"
                        className="restaurant_form_field"
                        name="deliveryman_email"
                      />
                      <ErrorMessage
                        className="restaurant_form_error"
                        name="deliveryman_email"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="form_control">
                    <div className="restaurant_form_item">
                      <label className="restaurant_form_label">
                        Contact number
                      </label>
                      <Field
                        type="number"
                        className="restaurant_form_field"
                        name="deliveryman_number"
                      />
                      <ErrorMessage
                        className="restaurant_form_error"
                        name="deliveryman_number"
                        component="div"
                      />
                    </div>
                    <div className="restaurant_form_item">
                      <label className="restaurant_form_label">
                        Select City
                      </label>
                      <select
                        aria-label="Default select example"
                        style={{ padding: "8px", width: "200px" }}
                        onChange={handleCity}
                      >
                        {CITY_OPTIONS.map((city) => (
                          <option value={city.value}>{city.label}</option>
                        ))}
                      </select>
                      <ErrorMessage
                        className="restaurant_form_error"
                        name="restaurant_city"
                        component="div"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" variant='dark' className="mt-5 px-5">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default RegisterDeliveryMan;
