import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function MobileMode() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialState = {
    email: "",
    password: "",
  };

  const [visiblePass, setVisiblePass] = useState(false);
  const handleVisiblePass = () => {
    setVisiblePass((prev) => !prev);
  };
  const [values, setValues] = useState(initialState);
  const [invalidCredentials, setInvalidCredentials] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      console.log(result);

      if (response.status == 422) {
        setErrors(result.errors || {});
        setInvalidCredentials("");
      } else if (response.status == 401) {
        setInvalidCredentials(result.message);
        setErrors({});
      } else {
        setErrors({});
        setInvalidCredentials("");
        localStorage.setItem("token", result.token);
        navigate(result.redirectRoute);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  return (
    <div className="mobileModee">
      <div className="top">
        <Link to="/register">
          <img src="/images/chevron-left.png" alt="Back" />
        </Link>
        <span>Sign In</span>
        <div className="formPart">
          <h4>WelcomeBack</h4>
          <span>
            Sign in your email and password or continue with social media
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
            <div>
              <div className="inpMobile">
                <img className="icon" src="/images/Message.png" alt="Email" />
                <input
                  value={values.email}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              {errors.email && <p className="reg-error">{errors.email}</p>}
            </div>
            <div>
              <div className="inpMobile">
                <img className="icon" src="/images/Lock.png" alt="Password" />
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
                <input
                  type={visiblePass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </div>
              {errors.password && (
                <p className="reg-error">{errors.password}</p>
              )}
            </div>
            <div className="checkbox">
              {/* <div className="rememberItem">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div> */}
              <div className="forgetItem">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>
            <button className="submit" to="/" type="submit">
              Sign In
            </button>
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
            Don't have an account?{" "}
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
