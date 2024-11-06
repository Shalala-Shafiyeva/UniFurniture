import React, { useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function DesktopMode() {

  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState("");
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
        setInvalidCredentials("");
      } else if (response.status == 401) {
        setInvalidCredentials(result.message);
        setErrors({});
      } else {
        setErrors({});
        setInvalidCredentials("");
        if (!isPolicyChecked) {
          setPolicyError("Please accept the terms and conditions.");
          return;
        }
        localStorage.setItem("token", result.token);
        navigate(result.redirectRoute);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className="desktopTabletModess">
      <div className="leftBg"></div>
      <div className="rightBg"></div>
      <div className="circle lightorange"></div>
      <div className="circle orange"></div>
      <div className="circle lightgreen"></div>
      <div className="circle greenCircle"></div>
      <div className="circle darkgreenCircle"></div>
      <div className="img">
        <img src="/images/illustration.png" alt="Login image" />
      </div>
      <div className="loginPage">
        <h3>
          Sign In to <span className="greenTxt">UniFurniture</span>
        </h3>
        <span>
          Don't have an account?{" "}
          <Link to="/register" className="greenTxt">
            Sign Up
          </Link>
        </span>
        {invalidCredentials && (
          <p className="reg-error">{invalidCredentials}</p>
        )}
        <form
          action=""
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="inp">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          {errors.email && <p className="reg-error">{errors.email}</p>}
          <div className="inp">
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={(e) => {
                onChange(e);
              }}
            />
            <Link to="/forgot-password" id="forgetPass">
              Forget Password ?
            </Link>
          </div>
          {errors.password && <p className="reg-error">{errors.password}</p>}
          <div className="icons">
            <div className="item orange"></div>
            <div className="item orange"></div>
            <div className="item green"></div>
            <div className="item green"></div>
            <div className="item darkgreen"></div>
            <div className="item lightgrey"></div>
          </div>
          <div className="privacy">
            <input
              type="checkbox"
              name="privacy"
              checked={isPolicyChecked}
              onChange={(e) => setIsPolicyChecked(e.target.checked)}
            />
            <span>
              You agree to our Privacy Policy, Term and Conditions and
              Notification settings
            </span>
          </div>
          {policyError && <p className="reg-error">{policyError}</p>}
          <button className="btnSignIn" type="submit">
            Sign In
          </button>
          <div className="continueWith">
            <span>Or continue with</span>
            <div className="btns">
              <a href="">
                <img src="/images/google.png" alt="Google Account" />
                <span>Google</span>
              </a>
              <a href="">
                <img src="/images/twitter.png" alt="Twitter Account" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DesktopMode;
