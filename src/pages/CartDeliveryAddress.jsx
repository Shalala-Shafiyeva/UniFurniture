import React from "react";
import Header from "../components/header/Header";
import Discover from "../components/cartDeliveryAddress/Discover";
import "../components/cartDeliveryAddress/cartDeliveryAddress.css";
import "../components/cartDeliveryAddress/cartDeliveryAddressResponsive.css";
import ShoppingCart from "../components/cartDeliveryAddress/ShoppingCart";

function CartDeliveryAddress() {
  return (
    <>
      <Header />
      <Discover />
      <ShoppingCart />
    </>
  );
}

export default CartDeliveryAddress;
