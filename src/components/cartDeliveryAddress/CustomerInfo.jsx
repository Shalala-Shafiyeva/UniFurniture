import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function CustomerInfo() {
  const cart = useSelector((state) => state.cart.cart);
  let totalPrice = cart.reduce(
    (acc, current) => acc + current.price * current.amount,
    0
  );
  totalPrice=parseFloat(totalPrice.toFixed(2));

  const [openForm, setOpenForm] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const handleOpenForm = () => {
    if (!openForm) {
      setFullname("");
      setEmail("");
    }
    setOpenForm((prev) => !prev);
  };

  const handleFullname = (value) => {
    setFullname(value);
  };
  const handleEmail = (value) => {
    setEmail(value);
  };

  useEffect(() => {
    const storedFullname = localStorage.getItem("fullname");
    const storedEmail = localStorage.getItem("email");
    if (storedFullname || storedEmail) {
      setFullname(storedFullname);
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fullname", fullname);
    localStorage.setItem("email", email);
  }, [fullname, email]);

  return (
    <div className="customerInfo">
      <div className="head">
        <h3>Shopping Cart</h3>
        <span>Total: ${totalPrice}</span>
      </div>
      <div className="customer">
        <span className="title">Customer Information</span>
        <div className="info">
          <div className={`currentInfo ${openForm ? "hidden" : ""}`}>
            <div className="context">
              <div className="img">
                <img src="/images/account.png" alt="User" />
              </div>
              <div className="nameEmail">
                <span>{fullname}</span>
                <span>{email}</span>
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
                  <label htmlFor="name">Customer Full Name</label>
                  <input
                    onChange={(e) => handleFullname(e.target.value)}
                    value={fullname}
                    type="text"
                    id="name"
                    placeholder="Enter your fullname"
                  />
                </div>
                <div className="inp">
                  <label htmlFor="email">Customer Email</label>
                  <input
                    onChange={(e) => handleEmail(e.target.value)}
                    value={email}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button type="button" onClick={handleOpenForm} className="submit">
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
