import React from "react";
import CustomerInfo from "./CustomerInfo";
import OrderSummary from "./OrderSummary";

function ShoppingCart() {
  return (
    <section className="shoppingCart">
      <div className="container">
        <CustomerInfo />
        <OrderSummary />
      </div>
    </section>
  );
}

export default ShoppingCart;
