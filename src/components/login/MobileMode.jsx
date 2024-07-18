import React from "react";
import './login.css';
import { Link } from "react-router-dom";
import { useState } from "react";

function MobileMode() {
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
    <div className="mobileModee">
      <div className="top">
        <a href="">
          <img src="/images/chevron-left.png" alt="Back" />
        </a>
        <span>Sign In</span>
        <div className="formPart">
          <h4>WelcomeBack</h4>
          <span>
            Sign in your email and password or continue with social media
          </span>
          <form action="">
            <div className="inpMobile">
              <img src="/images/Message.png" alt="Email" />
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="inpMobile">
              <img src="/images/Lock.png" alt="Password" />
              <input type="password" name="password" placeholder="Password" />
            </div>
            <div className="checkbox">
              <div className="rememberItem">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className="forgetItem">
                <a href="">Forgot Password?</a>
              </div>
            </div>
            <button type="submit">Sign In</button>
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
            Don't have an account?
            <Link to="/register" className="greenTxt">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default MobileMode;
