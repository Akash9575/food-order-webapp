import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Register_restaurant.css'

const Register_Restaurant = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  
  const HandelChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
    else {
      setImage(null)
    }
  }

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(image);
    } else {
      setPreview(null)
    }
  }, [image])

  return (
    <>
      <div className='restaurant_background'>
        <Formik
          initialValues={{ restaurant_name: '', email: '', contact:'', location:'', des: '' }}
          validate={values => {
            const errors = {};
            if (!values.restaurant_name) {
              errors.restaurant_name = "Required";
            }
            if (!values.contact) {
              errors.contact = "Required";
            }
            if (!values.location) {
              errors.location = "Required";
            }
            if (!values.des) {
              errors.des = "Required";
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {

            console.log(values)
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              // setSubmitting(false);
            }, 400);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (


            <Form className='restaurant_form'>
              <div className='form-top'>
              <div className='form_control'>
                <div className='restaurant_form_item'>
                  <label className='restaurant_form_label'>Restaurant Name </label>
                  <Field type="text" className="restaurant_form_field" name="restaurant_name" />
                  <ErrorMessage className='restaurant_form_error' name="restaurant_name" component="div" />

                </div>
                <div className='restaurant_form_item'>
                  <label className='restaurant_form_label'>Email  </label>
                  <Field type="email" className="restaurant_form_field" name="email" />
                  <ErrorMessage className='restaurant_form_error' name="email" component="div" />
                </div>

              </div>

              <div className='form_control'>
                <div className='restaurant_form_item'>
                  <label className='restaurant_form_label'>Contact number</label>
                  <Field type="text" className="restaurant_form_field" name="contact" />
                  <ErrorMessage className='restaurant_form_error' name="contact" component="div" />

                </div>
                <div className='restaurant_form_item'>
                  <label className='restaurant_form_label'>Location</label>
                  <Field type="text" className="restaurant_form_field" name="location" />
                  <ErrorMessage className='restaurant_form_error' name="location" component="div" />
                </div>

              </div>
              
              <div className='restaurant_form_item'>
                <label className='restaurant_form_label'>Description </label>
                <Field as="textarea" className="restaurant_form_textarea" type="text" name="des" />
                <ErrorMessage className='restaurant_form_error' name="des" component="div" />
              </div>
              <div>
                <img src={preview} className='restaurant_form_image' />
                <input id='fileinput' type='file' accept='image/*' onChange={HandelChange} />
              </div>
              </div>
             
              <button type="submit" disabled={isSubmitting} className='restaurant_form_button'>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Register_Restaurant