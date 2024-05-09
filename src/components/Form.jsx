import React from "react";
import { useState } from "react";
import axios from "axios";

const form = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [userID, setUserID] = useState(null);
  const emailRegex = /^[^\s@]+@reqres\.in$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*.-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setUserID(null);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = {};
    if (formData.fName.length < 3) {
      validationErrors.fName = "First Name must be at least 3 characters";
    }
    if (formData.lName.length < 3) {
      validationErrors.lName = "Last Name must be at least 3 characters";
    }
    if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email";
    }
    if (!passwordRegex.test(formData.password)) {
      validationErrors.password = "Please enter a valid password";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setUserID(null);
      return;
    }
    console.log(formData);

    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        setUserID(response.data.id);
        setFormData({
          fName: "",
          lName: "",
          email: "",
          password: "",
        });
        console.log("Successful", response.data);
      })
      .catch((error) => {
        console.log("Error", error.response.data);
      });
  }
  return (
    <>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fName">First Name</label>
            <input
              type="text"
              id="fName"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              placeholder="at least 3 characters"
            />
          </div>
          <div className="error-div">
            {errors.fName && <span className="error">{errors.fName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lName">Last Name</label>
            <input
              type="text"
              id="lName"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              placeholder="at least 3 characters"
            />
          </div>
          <div className="error-div">
            {errors.lName && <span className="error">{errors.lName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email ending with reqres.in"
            />
          </div>
          <div className="error-div">
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="at least 8 characters, uppercase, lowercase, symbols and numbers."
            />
          </div>
          <div className="error-div">
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {userID && <p className="user-id">User ID: {userID}</p>}
      </div>
    </>
  );
};
export default form;
