import React from "react";
import Header from "../components/header/Header";
import Order from "../components/orders/Order";
import Footer from "../components/footer/Footer";
import "../components/orders/orders.css";
import "../components/orders/ordersResponsive.css";

function Orders() {
  return (
    <>
      <Header />
      <Order />
      <Footer />
    </>
  );
}

export default Orders;
