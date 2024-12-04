import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";

function MobileMode() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [visiblePass, setVisiblePass] = useState(false);
  const handleVisiblePass = () => {
    setVisiblePass((prev) => !prev);
  };
  const [values, setValues] = useState({ name: "", surname: "", email: "", password: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      console.log(result);

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  return (
    <div className="mobileMode">
      <div className="top">
        <Link to="/login">
          <img src="/images/chevron-left.png" alt="Back" />
        </Link>
        <span>Hesab yaradın</span>
        <div className="formPart">
          <h4>Yeni hesab səhifəsi</h4>
          <span>Məlumatlarınızı tamamlayın və ya sosial media ilə davam edin</span>
          <form
            action=""
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <div>
              <div className="inpMobile">
                <img src="/images/user.png" alt="User" />
                <input
                  value={values.name}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  type="text"
                  name="name"
                  placeholder="Adınız"
                />
              </div>
              {errors.name && <p className="reg-error">{errors.name}</p>}
            </div>
            <div>
              <div className="inpMobile">
                <img src="/images/user.png" alt="User" />
                <input
                  value={values.surname}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  type="text"
                  name="surname"
                  placeholder="Soyadınız"
                />
              </div>
              {errors.surname && <p className="reg-error">{errors.surname}</p>}
            </div>
            <div>
              <div className="inpMobile">
                <img src="/images/Message.png" alt="Email" />
                <input
                  value={values.email}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  type="email"
                  name="email"
                  placeholder="Email-niz"
                />
              </div>
              {errors.name && <p className="reg-error">{errors.email}</p>}
            </div>
            <div>
              <div className="inpMobile">
                <img src="/images/Lock.png" alt="Password" />
                <input
                  value={values.password}
                  type={visiblePass ? "text" : "password"}
                  name="password"
                  placeholder="Şifrəniz"
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
              {errors.name && <p className="reg-error">{errors.password}</p>}
            </div>
            <button className="submit" type="submit">
              Hesab yaradın
            </button>
          </form>
        </div>
      </div>

      <div className="bottom">
        <div className="continueWith">
          <span>Və ya davam edin</span>
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
            Hesabınız var?{" "}
            <Link to="/login" className="greenTxt">
              Daxil olun
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default MobileMode;
