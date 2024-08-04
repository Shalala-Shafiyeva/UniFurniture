import React from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";

function MobileMode() {

  const [visiblePass, setVisiblePass] = useState(false);
  const handleVisiblePass = () => {
    setVisiblePass((prev) => !prev);
  };
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className="mobileMode">
      <div className="top">
        <Link to="/login">
          <img src="/images/chevron-left.png" alt="Back" />
        </Link>
        <span>Sign Up</span>
        <div className="formPart">
          <h4>Register Account</h4>
          <span>Complete your details or continue with social media</span>
          <form action="">
            <div className="inpMobile">
              <img src="/images/user.png" alt="User" />
              <input
                onChange={(e) => {
                  onChange(e);
                }}
                type="text"
                name="name"
                placeholder="Your name"
              />
            </div>
            <div className="inpMobile">
              <img src="/images/Message.png" alt="Email" />
              <input
                onChange={(e) => {
                  onChange(e);
                }}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="inpMobile">
              <img src="/images/Lock.png" alt="Password" />
              <input
                type={visiblePass ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  onChange(e);
                }}
              />
              <img
                className="hide"
                src={
                  visiblePass
                    ? "/images/home/show.png"
                    : "/images/home/Hide.png"
                }
                alt="Hidden password"
                onClick={handleVisiblePass}
              />
            </div>
            <Link className="submit" to="/login" type="submit">
              Sign Up
            </Link>
          </form>
        </div>
      </div>

      <div className="bottom">
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

        <div className="haveAccount">
          <span>
            Already have an account?{" "}
            <Link to="/login" className="greenTxt">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default MobileMode;
