import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "../cart/cart.css";
import "../cart/cartResponsice.css";
import { Link } from "react-router-dom";
import {
  increaseAmount,
  decreaseAmount,
  removeFromCart,
} from "../../slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";

function Cart({ openBasket, setOpenBasket }) {
  let cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const handleCloseCart = () => {
    setOpenBasket(false);
  };

  //basket with backend
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  
  const fetchCartProduct =useQuery("cartProducts", async () => {
    try {
      const response = await fetch("http://localhost:8000/api/basket/index", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      // setProducts(result.data || []);
      setTotal(result.totalPrice || 0);
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  });
  const products= fetchCartProduct.data || [];

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

  const fetchRemoveFromCart = async (basketId, productId, productColor) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/basket/delete/" + basketId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            product_color: productColor,
            product_id: productId,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  };

  const fetchDecreate = async (productId, productColor) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/basket/decrease",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            product_id: productId,
            product_color: productColor,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to increase product quantity");
      }
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  };

  const fetchIncreate = async (productId, productColor) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/basket/increase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            product_id: productId,
            product_color: productColor,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message || "Failed to increase product quantity");
      }
    } catch (error) {
      console.log("Error fetching: ", error);
    }
  };

  useEffect(() => {
    // fetchCartProduct();
    handleCartProductCount();
  }, [qty]);

  return (
    <section className={`cart ${!openBasket ? "closeCart" : ""}`}>
      <Toaster position="top-center" />
      <div className="modal">
        <div className="head">
          <div onClick={handleCloseCart} className="closeBtn">
            x
          </div>
          <span>Shopping Cart</span>
          {/* <span>{cart.length}</span> */}
          <span>{qty}</span>
        </div>
        <div className="orderProducts">
          {/* without backend
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
                              id: product.id,
                              type: product.type,
                              price: product.price,
                              stock: product.stock,
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
                              id: product.id,
                              type: product.type,
                              price: product.price,
                              stock: product.stock,
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
          )} */}
          {products?.length ? (
            products.map((product) => (
              <div className="product" key={product.id}>
                <div className="productDesc">
                  <div className="img">
                    <img
                      src={`http://localhost:8000/storage/${product?.color_image}`}
                      alt="Product"
                    />
                  </div>
                  <div className="txt">
                    <span className="title">
                      {product?.product?.full_title}
                    </span>
                    <span className="price">${product?.product?.price}</span>
                    <div className="qty">
                      <button
                        onClick={() => {
                          fetchDecreate(
                            product?.product_id,
                            product?.product_color
                          );
                        }}
                        className="decrease"
                      >
                        -
                      </button>
                      <span>{product.qty}</span>
                      <button
                        onClick={() => {
                          fetchIncreate(
                            product?.product_id,
                            product?.product_color
                          );
                        }}
                        className="increase"
                      >
                        +
                      </button>
                    </div>
                    <span className="color">{product?.product_color}</span>
                  </div>
                </div>
                <div
                  className="removeBtn"
                  onClick={() => {
                    fetchRemoveFromCart(
                      product?.id,
                      product?.product_id,
                      product?.product_color
                    );
                  }}
                >
                  <img src="/images/trash.svg" alt="Trash" />
                </div>
              </div>
            ))
          ) : (
            <div className="emptyCart">
              Looks like you haven’t added any items yet.
            </div>
          )}
        </div>
        <div className="totalCount">
          <span>Total:</span>
          {/* <span>
            ${cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}
          </span> */}
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="btn">
          <Link to="/cart/deliveryaddress">
            <button disabled={products.length === 0} className="orderBtn">
              Make Order
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
