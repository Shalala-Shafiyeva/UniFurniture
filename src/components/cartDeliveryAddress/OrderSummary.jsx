import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderSummary({ activateBtn }) {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
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
  const [totalDiscount, setTotalDiscount] = useState(0);
  const handleActive = () => {
    setFreenDelivery((prev) => !prev);
    setOrderAbove((prev) => !prev);
  };

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
      setProducts(result.data || []);
      setTotal(result.totalPrice || 0);
      setTotalDiscount(result.data?.reduce((acc, current) => acc + (Number(current?.product?.price) * Number(current?.product?.discount) * Number(current?.qty)) / 100, 0) || 0);
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  };

  

  const handleCartProductCount = async () => {
    try {
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
      setQty(result.data || 0);
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  };

  useEffect(() => {
    fetchCartProduct();
    handleCartProductCount();
  }, []);

  return (
    <div className="orderSum">
      <span className="title">Order Summary</span>
      <ul className="cartDetails">
        <li>
          <span>Total Item</span>
          {/* <span>{totalAmount}</span> */}
          <span>{qty || 0}</span>
        </li>
        <li>
          <span>Cart Total</span>
          {/* <span>${totalPrice}</span> */}
          <span>${total.toFixed(2) || 0}</span>
        </li>
        <li>
          <span>Product Discount</span>
          <span>${totalDiscount.toFixed(2)}</span>
        </li>
        <li>
          <span>Shipping</span>
          <span>Free</span>
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
        <span>Total</span>
        {/* <span>${parseFloat((totalPrice - totalDiscount - 20).toFixed(2))}</span> */}
        <span>${(total - totalDiscount).toFixed(2) || 0}</span>
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
