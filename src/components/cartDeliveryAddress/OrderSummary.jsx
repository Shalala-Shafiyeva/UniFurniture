import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderSummary({ activateBtn }) {
  console.log(activateBtn);
  const cart = useSelector((state) => state.cart.cart);
  const [freeDelivery, setFreenDelivery] = useState(true);
  const [orderAbove, setOrderAbove] = useState(false);
  const totalAmount = cart.reduce((acc, current) => acc + current.amount, 0);
  const totalPrice = cart.reduce(
    (acc, current) => acc + current.price * current.amount,
    0
  );
  const totalDiscount =
    (totalPrice * cart.reduce((acc, current) => acc + current.discount, 0)) /
    100;

  const handleActive = () => {
    setFreenDelivery((prev) => !prev);
    setOrderAbove((prev) => !prev);
  };
  return (
    <div className="orderSum">
      <span className="title">Order Summary</span>
      <ul className="cartDetails">
        <li>
          <span>Total Item</span>
          <span>{totalAmount}</span>
        </li>
        <li>
          <span>Cart Total</span>
          <span>${totalPrice}</span>
        </li>
        <li>
          <span>Product Discount</span>
          <span>${totalDiscount}</span>
        </li>
        <li>
          <span>Shipping</span>
          <span>$20.00</span>
        </li>
        <li>
          <span>Coupon Discount</span>
        </li>
      </ul>
      <div className="deliveryBtns">
        <button
          onClick={handleActive}
          className={`btn ${freeDelivery ? "active" : ""}`}
        >
          Free Delivery
        </button>
        <button
          onClick={handleActive}
          className={`btn ${orderAbove ? "active" : ""}`}
        >
          For Order Above
        </button>
      </div>
      <div className="total">
        <span>Total</span>
        <span>${totalPrice - totalDiscount - 20}</span>
      </div>
      <button disabled={activateBtn}>
        <Link
          to="#"
          className={`paymentAddress ${activateBtn ? "active" : ""}`}
        >
          <span>Place Order</span>
          <img src="/images/shop/arrow.png" alt="Arrow" />
        </Link>
      </button>
    </div>
  );
}

export default OrderSummary;
