import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

function DesktopMode() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [policyError, setPolicyError] = useState("");
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});

        if (!isPolicyChecked) {
          setPolicyError("Please accept the terms and conditions.");
          return;
        }
        setPolicyError("");
        
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
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
        <form
          action=""
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="form-wrapper">
            <div>
              <div className="inp">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              {errors.name && <p className="reg-error">{errors.name}</p>}
            </div>
            <div>
              <div className="inp">
                <label htmlFor="surname">Last Name</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  value={data.surname}
                  onChange={(e) =>
                    setData({ ...data, surname: e.target.value })
                  }
                />
              </div>
              {errors.surname && <p className="reg-error">{errors.surname}</p>}
            </div>
            <div>
              <div className="inp">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="reg-error">{errors.email}</p>}
            </div>
            <div>
              <div className="inp">
                <label htmlFor="password">Create Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
                <a href="" id="forgetPass">
                  Forget Password ?
                </a>
              </div>
              {errors.password && (
                <p className="reg-error">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="icons">
            <div className="item orange"></div>
            <div className="item orange"></div>
            <div className="item green"></div>
            <div className="item green"></div>
            <div className="item darkgreen"></div>
            <div className="item lightgrey"></div>
          </div>
          <div>
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
  );
}

export default DesktopMode;
