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
    checked_policy: false,
  });
  const [errors, setErrors] = useState({});
  // const [isPolicyChecked, setIsPolicyChecked] = useState(false);
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
        if (result.errors.checked_policy) {
          setPolicyError("Please accept the terms and conditions.");
        }
      } else {
        setErrors({});
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
          <span className="greenTxt">UniFurniture</span>-də hesab yaradın
        </h3>
        <span>
          Artıq hesabınız var?{" "}
          <Link to="/login" className="greenTxt">
            Daxil olun
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
                <label htmlFor="name">Ad</label>
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
                <label htmlFor="surname">Soyad</label>
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
                <label htmlFor="password">Şifrə</label>
                <input
                  type="password"
                  name="password"
                  id="password"
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
                checked={data.checked_policy}
                onChange={(e) =>
                  setData({ ...data, checked_policy: e.target.checked })
                }
              />
              <span>
                Siz Məxfilik Siyasətimizə, Şərtlər və Qaydalarımıza və Bildiriş
                ayarlarına razılıq verirsiniz.
              </span>
            </div>
            {policyError && <p className="reg-error">{policyError}</p>}
          </div>
          <button className="btnSignIn" type="submit">
            Hesab Yaradın
          </button>
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
        </form>
      </div>
      <div className="img">
        <img src="/images/illustrationSignup.png" alt="Login image" />
      </div>
    </div>
  );
}

export default DesktopMode;
