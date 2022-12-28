import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { register } from "../../../backendConnection/user";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch=useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading);
      const response = await register(values);
      dispatch(hideLoading())
      if (response.success) {
        message.success(response.message);
        window.location.href = "/login";
      }
      else message.error(response.message);
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };
  return (
    <div className="flex justify-center align-center h-screen w-screen">
      <div className="card w-600">
        <div className="flex flex-col">
          <h1 className="text-2xl">Register</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
              <input type="text" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <input type="email" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>
            <button type="submit" className="primary-content-btn w-100">
              Login
            </button>
            <div className="relinking">
              Already a member? <Link to="/login">Login here</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
