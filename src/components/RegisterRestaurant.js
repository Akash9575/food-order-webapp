import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import Form from 'react-bootstrap/Form'
import { cloudinary_upload_url } from "../urls/url";
import { fetch_url } from "../urls/url";
import "../styles/RegisterRestaurant.css";

const RegisterRestaurant = () => {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [restaurant_register_data, setRestaurant_register_data] = useState({});
  const [secure_url, setSecure_url] = useState("");
  const [selectCity,setSelectCity] = useState('');

  const HandelChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }

    if (secure_url) {
      setRestaurant_register_data({ ...restaurant_register_data, secure_url });
      fetch(`${fetch_url}/api/v1/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          restaurants: restaurant_register_data,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // if (data.error) {
          //   // alert(data.error);
          // } else {
          //   // alert(data.msg);
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image, secure_url]);

  console.log(restaurant_register_data);

  const uploadRestaurantImage = () => {
    if (image === "") return alert("Please upload image");

    const uploadfile = new FormData();
    uploadfile.append("file", image);
    uploadfile.append("upload_preset", "see-radio");
    uploadfile.append("cloud_name", "abhay-parsaniya");
    console.log(uploadfile);

    fetch(cloudinary_upload_url, {
      method: "POST",
      body: uploadfile,
    })
      .then((res) => res.json())
      .then((result) => {
        setSecure_url(result.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCity = (e) => {
    setSelectCity(e.target.value)
  };

  return (
    <>
      <div className="restaurant_background">
        <Formik
          initialValues={{
            restaurant_name: "",
            restaurant_email: "",
            restaurant_contact_number: "",
            restaurant_address: "",
            restaurant_city: "",
            restaurant_description: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.restaurant_name) {
              errors.restaurant_name = "Required";
            }
            if (
              !values.restaurant_contact_number ||
              values.restaurant_contact_number.length !== 10
            ) {
              errors.restaurant_contact_number = "Required";
            }
            if (!values.restaurant_city) {
              errors.restaurant_city = "Required";
            }
            if (!values.restaurant_description) {
              errors.restaurant_description = "Required";
            }
            if (!values.restaurant_address) {
              errors.restaurant_address = "Required";
            }
            if (!values.restaurant_email) {
              errors.restaurant_email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                values.restaurant_email
              )
            ) {
              errors.restaurant_email = "Invalid Email Address";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            setRestaurant_register_data(values);
            uploadRestaurantImage();
            resetForm();
            setImage("");
            setPreview("");
          }}
        >
          {({ isSubmitting }) => (
            <Form className="restaurant_form">
              <h2>Register Restaurant</h2>
              <div className="form-top">
                <div className="form_control">
                  <div className="restaurant_form_item">
                    <label className="restaurant_form_label">
                      Restaurant Name{" "}
                    </label>
                    <Field
                      type="text"
                      className="restaurant_form_field"
                      name="restaurant_name"
                    />
                    <ErrorMessage
                      className="restaurant_form_error"
                      name="restaurant_name"
                      component="div"
                    />
                  </div>
                  <div className="restaurant_form_item">
                    <label className="restaurant_form_label">Email </label>
                    <Field
                      type="email"
                      className="restaurant_form_field"
                      name="restaurant_email"
                    />
                    <ErrorMessage
                      className="restaurant_form_error"
                      name="restaurant_email"
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
                      type="text"
                      className="restaurant_form_field"
                      name="restaurant_contact_number"
                    />
                    <ErrorMessage
                      className="restaurant_form_error"
                      name="restaurant_contact_number"
                      component="div"
                    />
                  </div>
                  <div className="restaurant_form_item">
                    <label className="restaurant_form_label">City</label>
                    {/* <select name="restaurant_city" aria-label="Default select example" style={{padding:"8px",width:"200px"}} onChange={handleCity}>
                      <option>Select city</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyberabad">Hyberabad</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Pune">Pune</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Kochi">Kochi</option>
                    </select> */}
                    <Field
                      type="text"
                      className="restaurant_form_field"
                      name="restaurant_city"
                    />
                    <ErrorMessage
                      className="restaurant_form_error"
                      name="restaurant_city"
                      component="div"
                    />
                  </div>
                </div>

                <div className="restaurant_form_item">
                  <label className="restaurant_form_label" htmlFor="">
                    Restaurant Address
                  </label>
                  <Field
                    as="textarea"
                    className="restaurant_form_address_textarea"
                    type="text"
                    name="restaurant_address"
                  />
                  <ErrorMessage
                    className="restaurant_form_error"
                    name="restaurant_address"
                    component="div"
                  />
                </div>

                <div className="restaurant_form_item">
                  <label className="restaurant_form_label">Description</label>
                  <Field
                    as="textarea"
                    className="restaurant_form_description_textarea"
                    type="text"
                    name="restaurant_description"
                  />
                  <ErrorMessage
                    className="restaurant_form_error"
                    name="restaurant_description"
                    component="div"
                  />
                </div>
                <div>
                  <img
                    src={preview}
                    alt="No Selected"
                    className="restaurant_form_image"
                  />
                  <input
                    id="fileinput"
                    type="file"
                    accept="image/*"
                    onChange={HandelChange}
                  />
                </div>
              </div>

              <button type="submit" className="restaurant_form_button">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterRestaurant;
