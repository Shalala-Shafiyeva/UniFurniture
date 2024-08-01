import React from "react";
import CustomerInfo from "./CustomerInfo";
import OrderSummary from "./OrderSummary";
import DeliveryAddress from "./DeliveryAddress";
import BillingAddress from "./BillingAddress";
import CartOrder from "./CartOrder";

function ShoppingCart() {
  return (
    <section className="shoppingCart">
      <div className="container">
        <div className="left">
          <CustomerInfo />
          <DeliveryAddress />
          <BillingAddress />
          <CartOrder />
        </div>
        <div className="right">
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;
