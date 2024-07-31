import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../cart/cart.css";
import "../cart/cartResponsice.css";
import { Link } from "react-router-dom";
import { increaseAmount,decreaseAmount, removeFromCart } from "../../slices/cartSlice";

function Cart({ openBasket, setOpenBasket }) {
  let cart = useSelector((state) => state.cart.cart);
  const handleCloseCart = () => {
    setOpenBasket(false);
  };

  const dispatch = useDispatch();
  return (
    <section className={`cart ${!openBasket ? "closeCart" : ""}`}>
      <div className="modal">
        <div className="head">
          <div onClick={handleCloseCart} className="closeBtn">
            x
          </div>
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
                    <span className="price">${product.price}</span>
                    <div className="qty">
                      <button
                       onClick={() =>
                        dispatch(
                          decreaseAmount({
                            id:product.id,
                            type:product.type,
                            price:product.price,
                            stock:product.stock
                          })
                        )
                      }
                        className="decrease"
                      >
                        -
                      </button>
                      <span>{product.amount}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            increaseAmount({
                              id:product.id,
                              type:product.type,
                              price:product.price,
                              stock:product.stock
                            })
                          )
                        }
                        className="increase"
                      >
                        +
                      </button>
                    </div>
                    <span className="color">{product.color}</span>
                  </div>
                </div>
                <div
                  className="removeBtn"
                  onClick={() =>
                    dispatch(
                      removeFromCart({ id: product.id, type: product.type })
                    )
                  }
                >
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
          <Link to="/cart/deliveryaddress"><button className="orderBtn">Make Order</button></Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
