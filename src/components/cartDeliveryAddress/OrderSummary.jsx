import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderSummary({ activateBtn }) {
  const cart = useSelector((state) => state.cart.cart);
  const [freeDelivery, setFreenDelivery] = useState(true);
  const [orderAbove, setOrderAbove] = useState(false);
  const totalAmount = cart.reduce((acc, current) => acc + current.amount, 0);
  let totalPrice = cart.reduce(
    (acc, current) => acc + current.price * current.amount,
    0
  );
  totalPrice = parseFloat(totalPrice.toFixed(2));
  // const totalDiscount =
  //   (totalPrice * cart.reduce((acc, current) => acc + current.discount, 0)) /
  //   100;
  const handleActive = () => {
    setFreenDelivery((prev) => !prev);
    setOrderAbove((prev) => !prev);
  };

  // Fetch discount of products in the cart
  const { data: totalDiscount = 0 } = useQuery("totalDiscount", async () => {
    const response = await fetch("http://localhost:8000/api/basket/index", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    return result.totalDiscount || 0;
  });

  // Fetch count of products in the cart
  const { data: count = 0 } = useQuery("cartCount", async () => {
    const response = await fetch(
      "http://localhost:8000/api/basket/productQty",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    return result.data || 0;
  });

  // Fetch total price
  const { data: total = 0 } = useQuery("cartTotal", async () => {
    const response = await fetch("http://localhost:8000/api/basket/index", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    return result.totalPrice || 0;
  });

  return (
    <div className="orderSum">
      <span className="title">Sifarişlərin icmalı</span>
      <ul className="cartDetails">
        <li>
          <span>Cəmi Məhsul</span>
          {/* <span>{totalAmount}</span> */}
          <span>{count || 0}</span>
        </li>
        <li>
          <span>Səbət Ümumi</span>
          {/* <span>${totalPrice}</span> */}
          <span>${total.toFixed(2) || 0}</span>
        </li>
        <li>
          <span>Məhsul Endirimi</span>
          <span>${totalDiscount.toFixed(2)}</span>
        </li>
        <li>
          <span>Çatdırılma</span>
          <span>Pulsuz</span>
        </li>
        {/* <li>
          <span>Coupon Discount</span>
        </li> */}
      </ul>
      {/* <div className="deliveryBtns">
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
      </div> */}
      <div className="total">
        <span>Toplam</span>
        {/* <span>${parseFloat((totalPrice - totalDiscount - 20).toFixed(2))}</span> */}
        <span>${(total - totalDiscount).toFixed(2) || 0}</span>
      </div>
      <button disabled={activateBtn}>
        <Link
          to="#"
          className={`paymentAddress ${activateBtn ? "active" : ""}`}
        >
          <span>Sifarişi Ver</span>
          <img src="/images/shop/arrow.png" alt="Arrow" />
        </Link>
      </button>
    </div>
  );
}

export default OrderSummary;
