import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from "../../slices/cartSlice";

function CartOrder() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleCartLength = () => {
    if (cart.length - 1 == 0) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="cartOrder">
      <div className={`closeOrder ${open ? "hidden" : "visible"}`}>
        <span className="title">Order Summary</span>
        <div className="cover">
          <span className="items">
            {cart.length} {cart.length > 1 ? "items" : "item"}
          </span>
          <button disabled={cart.length===0 } onClick={handleOpen} className="change">
            Change
          </button>
        </div>
      </div>
      <div className={`openOrder ${open ? "visible" : "hidden"}`}>
        <div className="head">
          <span className="title">Order Summary</span>
          <span className="items">
            {cart.length} {cart.length > 1 ? "items" : "item"}
          </span>
        </div>
        <div className="products">
          <div onClick={handleOpen} className="closeBtn">
            <img src="/images/close.png" alt="Close" />
          </div>
          {cart.map((product) => (
            <div className="product" key={product.id}>
              <div className="img">
                <img src={product.img} alt="Product" />
              </div>
              <div className="content">
                <span className="name">{product.fulltitle}</span>
                <span className="color">Product Color: {product.color}</span>
                <div className="priceShipping">
                  <span className="price">$ {product.price}</span>
                  <div className="shipping">Ship on Friday, 30 October</div>
                </div>
                <div className="rating">
                  <div className="stars">
                    <img src="/images/star.png" alt="Star" />
                    <img src="/images/star.png" alt="Star" />
                    <img src="/images/star.png" alt="Star" />
                    <img src="/images/star.png" alt="Star" />
                    <img src="/images/star.png" alt="Star" />
                  </div>
                  <span className="review">{product.reviews} Reviews</span>
                </div>
                <div className="bottom">
                  <div
                    onClick={() => {
                      dispatch(removeFromCart({ id: product.id }));
                      handleCartLength();
                    }}
                    className="removeBtn"
                  >
                    Remove
                  </div>
                  <div className="qty">
                    <div
                      onClick={() =>
                        dispatch(increaseAmount({ id: product.id }))
                      }
                      className="plusBtn"
                    >
                      +
                    </div>
                    <span>{product.amount}</span>
                    <div
                      onClick={() =>
                        dispatch(decreaseAmount({ id: product.id }))
                      }
                      className="minusBtn"
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartOrder;
