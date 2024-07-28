import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../cart/cart.css";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const [closeCart, setCloseCart] = useState(false);

const handleCloseCart = () => {
  setCloseCart(true);
};
  return (
    <section className={`cart ${closeCart?"closeCart":""}`}>
      <div className="modal">
        <div className="head">
          <div onClick={handleCloseCart} className="closeBtn">x</div>
          <span>Shopping Cart</span>
          <span>{cart.length}</span>
        </div>
        <div className="orderProducts">
          {cart.length ? (
            cart.map((product) => (
              <div className="product">
                <div className="productDesc">
                  <div className="img">
                    <img src={product.img} alt="Product" />
                  </div>
                  <div className="txt">
                    <span className="title">{product.fullTitle}</span>
                    <span className="price">${product.totalPrice}</span>
                    <span className="qty">{product.amount}</span>
                    <span className="color">{product.color}</span>
                  </div>
                </div>
                <div className="removeBtn">
                  <img src="/images/trash.svg" alt="Trash" />
                </div>
              </div>
            ))
          ) : (
            <div className="emptyCart">You didn't order anything</div>
          )}
        </div>
        <div className="totalCount">
          <span>Total:</span>
          <span>${cart.reduce((acc, item) => acc + item.totalPrice, 0)}</span>
        </div>
        <div className="btn">
          <button className="orderBtn">Make Order</button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
