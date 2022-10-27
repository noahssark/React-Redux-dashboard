import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useToasts } from "react-toast-notifications";
import { createPost, getPost, updatePost } from "../../actions/postAction";
import { validateInput } from "../../validations/validations";
import validator from "validator"

const AddPost = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { post, error } = useSelector((state) => state.post);
  const { id } = useParams();
  const { addToast } = useToasts();
  // const rexgex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Enter valid Email!')
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    city: "",
    email: "",
  });

  useEffect(() => {
    if (id && post) {
      setInitialValues({
        id,
        name: post.name,
        username: post.username,
        city: post.address.city,
        email: post.email
      });
    }
  }, [id, post]);

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: "error",
        autoDismissTimeout: 3000,
        autoDismiss: true,
      });
    }
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <div className="py-4">
        <div className="card shadow">
          <div className="card-header">Add New</div>
          <div className="card-body">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validate={(values) => {
                const errors = {};

                errors.name = validateInput(values.name) || null;
                errors.username = validateInput(values.username) || null;
                errors.city = validateInput(values.city) || null;
                errors.email = validateInput(values.email) || null;

                for (var key in errors) {
                  if (errors[key] !== null) return errors;
                }
                return true;
              }}

              
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                let post = {
                  name: values.title,
                  username: values.username,
                  city: values.city,
                  email: values.email
                };
                if (values.id) {
                  post.id = values.id;
                }

                dispatch(values.id ? updatePost(post) : createPost(post));

                addToast(
                  `Post ${values.id ? "updated" : "added"} successfully`,
                  {
                    appearance: "success",
                    autoDismissTimeout: 3000,
                    autoDismiss: true,
                  }
                );
                history.push("/");
              }}

              
            >

              

              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      Name <span className="text-danger">*</span>
                    </Form.Label>
                    <span className="errorMsg">
                      {props.errors.name &&
                        props.touched.name &&
                        props.errors.name}
                    </span>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Please enter your name"
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </Form.Group>

                   <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <span className="errorMsg">
                      {props.errors.username &&
                        props.touched.username &&
                        props.errors.username}
                    </span>
                    <Form.Control
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      value={props.values.username}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </Form.Group>

                   <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      E-mail <span className="text-danger">*</span>
                    </Form.Label>
                    <span className="errorMsg">
                      {props.errors.email &&
                        props.touched.email &&
                        props.errors.email}
                    </span>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter your E-mail address"
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      
                      
                      
                    />
                  </Form.Group>

                   <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      Address <span className="text-danger">*</span>
                    </Form.Label>
                    <span className="errorMsg">
                      {props.errors.city &&
                        props.touched.city &&
                        props.errors.city}
                    </span>
                    <Form.Control
                      name="city"
                      type="text"
                      placeholder="Enter your Address"
                      value={props.values.city}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    {id ? "Update" : "Add New"} 
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
