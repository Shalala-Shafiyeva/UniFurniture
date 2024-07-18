import React from 'react'
import { Link } from 'react-router-dom';
import './register.css';

function DesktopMode() {
  return (
    <div className="desktopTabletModes">
        <div className="leftBg"></div>
        <div className="rightBg"></div>
        <div className="circle lightorange"></div>
        <div className="circle orange"></div>
        <div className="circle lightgreen"></div>
        <div className="circle greenCircle"></div>
        <div className="circle darkgreenCircle"></div>
        <div className="circle darkgreenCircle2"></div>
        <div className="loginPage">
          <h3>
            Create account to <span className="greenTxt">UniFurniture</span>
          </h3>
          <span>
            Already have an account ? 
            <Link to="/login" className="greenTxt">
              Sign In
            </Link>
          </span>
          <form action="">
            <div className="inp">
              <label htmlFor="name">First Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="inp">
              <label htmlFor="surname">Last Name</label>
              <input type="text" name="surname" id="surname" />
            </div>
            <div className="inp">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="inp">
              <label htmlFor="password">Create Password</label>
              <input type="password" name="password" id="password" />
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
              Sign Up
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
        <div className="img">
          <img src="/images/illustrationSignup.png" alt="Login image" />
        </div>
      </div>
  )
}

export default DesktopMode