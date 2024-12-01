import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function PaymentMethod({ activateBtn, handleActivateBtn, orderAddress }) {
  const [open, setOpen] = useState(false);
  const payBtns = ["Credit Card", "PayPal", "Pay on Invoice", "Google Pay"];
  const [activeForm, setActiveForm] = useState("Credit Card");
  const [activeBtn, setActiveBtn] = useState("Credit Card");
  const [inputValue, setInputValue] = useState({
    cardNum: "",
    name: "",
    expire: "",
    cvv: "",
    paypalEmail: "",
    invoiceNum: "",
    googlePay: "",
  });
  const [errors, setErrors] = useState({});
  const handleActiveForm = (item) => {
    setActiveForm(item);
    setActiveBtn(item);
    setErrors({});
    setInputValue({
      cardNum: "",
      name: "",
      expire: "",
      cvv: "",
      paypalEmail: "",
      invoiceNum: "",
      googlePay: "",
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValue({ ...inputValue, [id]: value });
  };

  const validationInputs = () => {
    const newErrors = {};
    if (activeForm === "Credit Card") {
      if (inputValue.cardNum.trim() === "")
        newErrors.cardNum = "Card Number is required";
      if (inputValue.name.trim() === "")
        newErrors.name = "Holder Name is required";
      if (inputValue.expire.trim() === "")
        newErrors.expire = "Expiry Date is required";
      if (inputValue.cvv.trim() === "") newErrors.cvv = "CVV Code is required";
    }
    if (activeForm === "PayPal") {
      if (!inputValue.paypalEmail)
        newErrors.paypalEmail = "PayPal Email is required";
    }
    if (activeForm === "Pay on Invoice") {
      if (!inputValue.invoiceNum)
        newErrors.invoiceNum = "Invoice Number is required";
    }
    if (activeForm === "Google Pay") {
      if (!inputValue.googlePay)
        newErrors.googlePay = "Google Pay ID is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length == 0) {
      localStorage.setItem("paymentMethod", activeBtn);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationInputs()) {
      handleActivateBtn();
      return true;
    }
    return false;
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleOrderCreate = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/order/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          address: localStorage.getItem("defaultAddress"),
          payment_type: localStorage.getItem("paymentMethod"),
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        window.scrollTo(0, 0);
        localStorage.removeItem("paymentMethod");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="paymentMethod">
      <Toaster position="top-center" />
      <span className={`title ${open ? "hidden" : "visible"}`}>
        Payment Method
      </span>
      <div className={`closeItem ${open ? "hidden" : "visible"}`}>
        <span>Credit Card</span>
        <button className="add" onClick={handleOpen}>
          Add
        </button>
      </div>
      <div className={`openItem ${open ? "visible" : "hidden"}`}>
        <h5>Payment Method</h5>
        <div className="wrapper">
          <div className="btns">
            {payBtns.map((btn, index) => (
              <button
                onClick={(e) => handleActiveForm(btn)}
                key={index}
                className={`btn ${activeBtn === btn ? "active" : ""}`}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="form">
            <form
              method="POST"
              onSubmit={(e) => {
                if (!localStorage.getItem("defaultAddress")) {
                  toast.error("Please choose delivery address");
                }
                if (errors.length) {
                  toast.error("Please complete payment method");
                }
                if (handleSubmit(e)) {
                  handleOrderCreate();
                }
              }}
              action=""
            >
              {activeForm === "Credit Card" && (
                <div className="cardForm">
                  <div className="inp">
                    <label htmlFor="cardNum">Card Number*</label>
                    <input
                      type="text"
                      id="cardNum"
                      placeholder="Your card number"
                      value={inputValue.cardNum || ""}
                      onChange={handleInputChange}
                    />
                    {errors.cardNum && (
                      <span className="error">{errors.cardNum}</span>
                    )}
                  </div>
                  <div className="inp">
                    <label htmlFor="name">Holder Name*</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name of card owner"
                      value={inputValue.name || ""}
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <span className="error">{errors.name}</span>
                    )}
                  </div>
                  <div className="inp">
                    <label htmlFor="expire">Expiry Date*</label>
                    <input
                      type="date"
                      id="expire"
                      value={inputValue.expire || ""}
                      onChange={handleInputChange}
                    />
                    {errors.expire && (
                      <span className="error">{errors.expire}</span>
                    )}
                  </div>
                  <div className="inp">
                    <label htmlFor="code">CVV Code*</label>
                    <input
                      placeholder="Enter CVV code"
                      type="text"
                      id="cvv"
                      value={inputValue.cvv || ""}
                      onChange={handleInputChange}
                    />
                    {errors.cvv && <span className="error">{errors.cvv}</span>}
                  </div>
                  {/* <div className="inpCheck">
                    <input type="checkbox" id="saveCart" />
                    <label htmlFor="saveCard">Save my card for future</label>
                  </div> */}
                </div>
              )}
              {activeForm === "PayPal" && (
                <div className="payPalForm">
                  <div className="inp">
                    <label htmlFor="paypalEmail">PayPal Email*</label>
                    <input
                      id="paypalEmail"
                      type="email"
                      placeholder="PayPal Email"
                      value={inputValue.paypalEmail || ""}
                      onChange={handleInputChange}
                    />
                    {errors.paypalEmail && (
                      <span className="error">{errors.paypalEmail}</span>
                    )}
                  </div>
                </div>
              )}
              {activeForm === "Pay on Invoice" && (
                <div className="invoiceForm">
                  <div className="inp">
                    <label htmlFor="invoiceNum">Invoice Number*</label>
                    <input
                      id="invoiceNum"
                      type="text"
                      placeholder="Invoice Number"
                      value={inputValue.invoiceNum || ""}
                      onChange={handleInputChange}
                    />
                    {errors.invoiceNum && (
                      <span className="error">{errors.invoiceNum}</span>
                    )}
                  </div>
                </div>
              )}
              {activeForm === "Google Pay" && (
                <div className="googlePayForm">
                  <div className="inp">
                    <label htmlFor="googlePay">Google Pay*</label>
                    <input
                      id="googlePay"
                      type="text"
                      placeholder="Google Pay ID"
                      value={inputValue.googlePay || ""}
                      onChange={handleInputChange}
                    />
                    {errors.googlePay && (
                      <span className="error">{errors.googlePay}</span>
                    )}
                  </div>
                </div>
              )}
              <div className="confirmBtn">
                <button type="submit">Confirm & Pay</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
