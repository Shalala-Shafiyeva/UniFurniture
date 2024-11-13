import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

function CustomerInfo() {
  // const cart = useSelector((state) => state.cart.cart);
  // let totalPrice = cart.reduce(
  //   (acc, current) => acc + current.price * current.amount,
  //   0
  // );
  // totalPrice = parseFloat(totalPrice.toFixed(2));

  const [openForm, setOpenForm] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    city: "",
    country: "",
    phone: "",
    profile: "",
  });
  const [errors, setErrors] = useState({});

  const handleUserInfoChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = value == "null" ? null : value;
    if (name === "profile" && files.length > 0) {
      setUserInfo({ ...userInfo, [name]: files[0] });
    } else {
      setUserInfo({ ...userInfo, [name]: fieldValue });
    }
  };

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/index", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setUserInfo(result.data);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  }, [userInfo]);

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("surname", userInfo.surname);
    formData.append("city", userInfo.city);
    formData.append("country", userInfo.country);
    formData.append("phone", userInfo.phone);

    if (userInfo.profile instanceof File) {
      formData.append("profile", userInfo.profile);
    }
    try {
      const response = await fetch("http://localhost:8000/api/user/edit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (response.status == 422) {
        setErrors(result.errors);
        setOpenForm(true);
      } else {
        setErrors({});
        setOpenForm(false);
        setUserInfo(result.data);
      }
      console.log(userInfo);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };
  const handleOpenForm = () => {
    setOpenForm((prev) => !prev);
  };
  
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartProduct = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/basket/index", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setTotalPrice(result.totalPrice || 0);
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  };

  useEffect(() => {
    fetchCartProduct(); 
    fetchUserInfo();
  }, []);

  return (
    <div className="customerInfo">
      <div className="head">
        <h3>Shopping Cart</h3>
        <span>Total: ${totalPrice.toFixed(2)}</span>
      </div>
      <div className="customer">
        <span className="title">Customer Information</span>
        <div className="info">
          <div className={`currentInfo ${openForm ? "hidden" : ""}`}>
            <div className="context">
              <div className="img">
                <img
                  src={`http://localhost:8000/storage/${userInfo.profile}`}
                  alt="User"
                />
              </div>
              <div className="nameEmail">
                <span>
                  {userInfo.name} {userInfo.surname}
                </span>
                <span>{userInfo.email}</span>
              </div>
            </div>
            <button onClick={handleOpenForm} className="change">
              Change
            </button>
          </div>
          <div className={`changeForm ${openForm ? "visible" : "hidden"}`}>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <div className="inps">
                <div className="inp">
                  <label htmlFor="name">Customer Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your fullname"
                    name="name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="inp">
                  <label htmlFor="surname">Customer Surname</label>
                  <input
                    type="text"
                    id="surname"
                    placeholder="Enter your surname"
                    name="surname"
                    value={userInfo.surname}
                    onChange={handleUserInfoChange}
                  />
                  {errors.surname && (
                    <span className="error">{errors.surname}</span>
                  )}
                </div>
                <div className="inp">
                  <label htmlFor="city">Customer City</label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter your city"
                    name="city"
                    value={userInfo.city}
                    onChange={handleUserInfoChange}
                  />
                  {errors.city && <span className="error">{errors.city}</span>}
                </div>
                <div className="inp">
                  <label htmlFor="country">Customer Country</label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Enter your country"
                    name="country"
                    value={userInfo.country}
                    onChange={handleUserInfoChange}
                  />
                  {errors.country && (
                    <span className="error">{errors.country}</span>
                  )}
                </div>
                <div className="inp">
                  <label htmlFor="phone">Customer Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone"
                    name="phone"
                    value={userInfo.phone || ""}
                    onChange={handleUserInfoChange}
                  />
                  {errors.phone && (
                    <span className="error">{errors.phone}</span>
                  )}
                </div>
                <div className="inp">
                  <label htmlFor="profile">Customer Profile</label>
                  <input
                    type="file"
                    id="profile"
                    name="profile"
                    onChange={handleUserInfoChange}
                  />
                  {errors.profile && <span>{errors.profile}</span>}
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  // handleOpenForm();
                  handleUserInfoSubmit(e);
                }}
                className="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
