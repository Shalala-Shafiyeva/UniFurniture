import React from "react";
import { Link } from "react-router-dom";
import './register.css';

function MobileMode() {
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
              <input type="text" name="name" placeholder="Your name" />
            </div>
            <div className="inpMobile">
              <img src="/images/Message.png" alt="Email" />
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="inpMobile">
              <img src="/images/Lock.png" alt="Password" />
              <input type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit">Sign Up</button>
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
