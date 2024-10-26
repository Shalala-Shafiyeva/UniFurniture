import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../components/forgotPassword/forgotPassword.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalidCredentials] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

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
        navigate("/login");
      }
    } catch (error) {
      console.error("Error reset password:", error);
    }
  };

  return (
    <div className="container-forgot">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="wrapper">
        <h3>Forgot Password</h3>
        <div className="form">
          <form
            action=""
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <div className="inp">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="reg-error">{errors.email}</p>}
              {invalidCredentials && (
                <p className="reg-error">{invalidCredentials}</p>
              )}
            </div>
            <div>
              <div className="inp">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              {errors.password && (
                <p className="reg-error">{errors.password}</p>
              )}
            </div>
            <button type="submit" className="btn">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
