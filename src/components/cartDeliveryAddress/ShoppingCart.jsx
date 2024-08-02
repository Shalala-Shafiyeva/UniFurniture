import React from "react";
import { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import OrderSummary from "./OrderSummary";
import DeliveryAddress from "./DeliveryAddress";
import BillingAddress from "./BillingAddress";
import CartOrder from "./CartOrder";
import PaymentMethod from "./PaymentMethod";


function ShoppingCart() {
  const [activateBtn, setActivateBtn] = useState(false);
  const handleActivateBtn = () => {
    setActivateBtn(true);
  };
  return (
    <section className="shoppingCart">
      <div className="container">
        <div className="left">
          <CustomerInfo />
          <DeliveryAddress />
          <BillingAddress />
          <CartOrder />
          <PaymentMethod
            activateBtn={activateBtn}
            handleActivateBtn={handleActivateBtn}
          />
        </div>
        <div className="right">
          <OrderSummary activateBtn={activateBtn} />
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;
