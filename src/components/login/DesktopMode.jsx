import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function DesktopMode() {
  const initialState = {
    email: "",
    name: "",
    password: "",
  };

  const [values, setValues] = useState(initialState);

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
          Don't have an account?
          <Link to="/register" className="greenTxt">
            Sign Up
          </Link>
        </span>
        <form action="">
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
          <div className="inp">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
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
            <a href="" id="forgetPass">
              Forget Password ?
            </a>
          </div>
          <div className="icons">
            <div className="item orange"></div>
            <div className="item orange"></div>
            <div className="item green"></div>
            <div className="item green"></div>
            <div className="item darkgreen"></div>
            <div className="item lightgrey"></div>
          </div>
          <div className="privacy">
            <input type="checkbox" name="privacy" />
            <span>
              You agree to our Privacy Policy, Term and Conditions and
              Notification settings
            </span>
          </div>
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
