import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
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

  //backend
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
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
    fetchCartProduct();
    handleCartProductCount();
  }, []);

  //rating system
  const [averageRatings, setAverageRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const fetchRatings = async () => {
    const ratings = {};
    for (const product of products) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product/${product.id}/average-rating`
        );
        const result = await response.json();
        ratings[product.id] = result.average_rating || 0;
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    }
    setAverageRatings(ratings);
  };

  const fetchReviews = async () => {
    const productReviews = {};
    for (const product of products) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product/${product.id}/reviews`
        );
        const result = await response.json();
        productReviews[product.id] = result.data || 0;
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    }
    setReviews(productReviews);
  };

  useEffect(() => {
    fetchRatings();
    fetchReviews();
    handleShippingDate();
  }, [products]);

  const fullStar = "/images/star.png";
  const emptyStar = "/images/emptyStar.png";

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? fullStar : emptyStar}
          alt={`${i <= rating ? "Full" : "Empty"} Star`}
        />
      );
    }
    return stars;
  };

  //Shipping system
  const [shippingDate, setShippingDate] = useState({});
  const todayWeekDay = new Date().getDay();
  const todayDayNumber = new Date().getDate();
  const todayMonthNumber = new Date().getMonth();
  const handleShippingDate = () => {
    const shippings = {};
    for (const product of products) {
      try {
        shippings[product.product_id] = product?.product?.shipping || 0;
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    setShippingDate(shippings);
  };

  const handleWeekDay = (shipping) => {
    switch (todayWeekDay + shipping) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        return "Monday";
    }
  };

  const handleMonth = () => {
    switch (todayMonthNumber) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "January";
    }
  };


  return (
    <div className="cartOrder">
      <Toaster position="top-center" />
      <div className={`closeOrder ${open ? "hidden" : "visible"}`}>
        <span className="title">Order Summary</span>
        <div className="cover">
          <span className="items">
            {/* {cart.length} {cart.length > 1 ? "items" : "item"} */}
            {qty} {qty > 1 ? "items" : "item"}
          </span>
          <button
            // disabled={cart.length === 0}
            disabled={qty === 0}
            onClick={handleOpen}
            className="change"
          >
            Change
          </button>
        </div>
      </div>
      <div className={`openOrder ${open ? "visible" : "hidden"}`}>
        <div className="head">
          <span className="title">Order Summary</span>
          <span className="items">
            {/* {cart.length} {cart.length > 1 ? "items" : "item"} */}
            {qty} {qty > 1 ? "items" : "item"}
          </span>
        </div>
        <div className="products">
          <div onClick={handleOpen} className="closeBtn">
            <img src="/images/close.png" alt="Close" />
          </div>
          {products.length > 0 &&
            products?.map((product) => (
              <div className="product" key={product.product_id}>
                <div className="img">
                  <img
                    src={`http://localhost:8000/storage/${product?.color_image}`}
                    alt="Product"
                  />
                </div>
                <div className="content">
                  <span className="name">{product?.product?.full_title}</span>
                  <span className="color">
                    Product Color: {product?.product_color}
                  </span>
                  <div className="priceShipping">
                    <span className="price">
                      $ {product?.product?.price.toFixed(2)}
                    </span>
                    <div className="shipping">Ship on {handleWeekDay(shippingDate[product?.product_id])}, {todayDayNumber + shippingDate[product?.product_id]} {handleMonth()}</div>
                  </div>
                  <div className="rating">
                    <div className="stars">
                      {renderStars(averageRatings[product?.product_id] || 0)}
                      {/* <img src="/images/star.png" alt="Star" />
                      <img src="/images/star.png" alt="Star" />
                      <img src="/images/star.png" alt="Star" />
                      <img src="/images/star.png" alt="Star" />
                      <img src="/images/star.png" alt="Star" /> */}
                    </div>
                    <span className="review">
                      {reviews[product?.product_id] || 0} Reviews
                    </span>
                  </div>
                  <div className="bottom">
                    <div
                      onClick={() => {
                        fetchRemoveFromCart(
                          product?.basket_id,
                          product?.product_id,
                          product?.product_color
                        );
                        // dispatch(removeFromCart({ id: product.id }));
                        handleCartLength();
                      }}
                      className="removeBtn"
                    >
                      Remove
                    </div>
                    <div className="qty">
                      <div
                        onClick={() => {
                          fetchIncreate(
                            product?.product_id,
                            product?.product_color
                          );
                          // dispatch(increaseAmount({ id: product.id }))
                        }}
                        className="plusBtn"
                      >
                        +
                      </div>
                      {/* <span>{product.amount}</span> */}
                      <span>{product?.qty}</span>
                      <div
                        onClick={() => {
                          fetchDecreate(
                            product?.product_id,
                            product?.product_color
                          );
                          // dispatch(decreaseAmount({ id: product.id }))
                        }}
                        className="minusBtn"
                      >
                        -
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* {cart.map((product) => (
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
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default CartOrder;
