import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  removeFromCart,
  increaseAmount,
  decreaseAmount,
} from "../../slices/cartSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();

  // Fetch cart products
  const { data: products = [], isLoading: isFetchingCart } = useQuery(
    "cartProducts",
    async () => {
      const response = await fetch("http://localhost:8000/api/basket/index", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      return result.data || [];
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Fetch ratings of products
  const { data: rating = [], isLoading: isFetchingRating } = useQuery(
    "ratingProducts",
    async () => {
      const response = await fetch("http://localhost:8000/api/basket/index", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      return result.rating || [];
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Fetch ratings of products
  const { data: reviews = [], isLoading: isFetchingReviews } = useQuery(
    "reviewsProducts",
    async () => {
      const response = await fetch("http://localhost:8000/api/basket/index", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      return result.reviews || [];
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Fetch count of products in the cart
  const { data: count = 0 } = useQuery("cartCount", async () => {
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
    return result.data || 0;
  });

  // Mutation to remove a product from the cart
  const removeMutation = useMutation(
    async ({ basketId, productId, productColor }) => {
      const response = await fetch(
        `http://localhost:8000/api/basket/delete/${basketId}`,
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
      return response.json();
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries("cartProducts");
          queryClient.invalidateQueries("cartTotal");
          queryClient.invalidateQueries("cartCount");
          queryClient.invalidateQueries("totalDiscount");
        } else {
          toast.error(data.message || "Failed to remove product");
        }
      },
    }
  );

  // Mutation to increase product quantity
  const increaseMutation = useMutation(
    async ({ productId, productColor }) => {
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
      return response.json();
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries("cartProducts");
          queryClient.invalidateQueries("cartTotal");
          queryClient.invalidateQueries("cartCount");
          queryClient.invalidateQueries("totalDiscount");
        } else {
          toast.error(data.message || "Failed to increase product quantity");
        }
      },
    }
  );

  // Mutation to decrease product quantity
  const decreaseMutation = useMutation(
    async ({ productId, productColor }) => {
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
      return response.json();
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          queryClient.invalidateQueries("cartProducts");
          queryClient.invalidateQueries("cartTotal");
          queryClient.invalidateQueries("cartCount");
          queryClient.invalidateQueries("totalDiscount");
        } else {
          toast.error(data.message || "Failed to decrease product quantity");
        }
      },
    }
  );

  useEffect(() => {
    handleShippingDate();
  }, [count]);

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
            {count} {count > 1 ? "items" : "item"}
          </span>
          {count.length > 0 && (
            <button
              // disabled={cart.length === 0}
              disabled={count === 0}
              onClick={handleOpen}
              className="change"
            >
              Change
            </button>
          )}
        </div>
      </div>
      <div className={`openOrder ${open ? "visible" : "hidden"}`}>
        <div className="head">
          <span className="title">Order Summary</span>
          <span className="items">
            {/* {cart.length} {cart.length > 1 ? "items" : "item"} */}
            {count} {count > 1 ? "items" : "item"}
          </span>
        </div>
        <div className="products">
          <div onClick={handleOpen} className="closeBtn">
            <img src="/images/close.png" alt="Close" />
          </div>
          {products.length > 0 &&
            products?.map((product, index) => (
              <div className="product" key={index}>
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
                    <div className="shipping">
                      Ship on {handleWeekDay(shippingDate[product?.product_id])}
                      , {todayDayNumber + shippingDate[product?.product_id]}{" "}
                      {handleMonth()}
                    </div>
                  </div>
                  <div className="rating">
                    <div className="stars">
                      {renderStars(
                        rating[index]?.[product?.product_id]?.original
                          ?.average_rating || 0
                      )}
                      {/* <img src="/images/star.png" alt="Star" />
                      <img src="/images/star.png" alt="Star" />
                      <img src="/images/star.png" alt="Star" />
                      <img src="/images/star.png" alt="Star" />
                      <img src="/images/star.png" alt="Star" /> */}
                    </div>
                    <span className="review">
                      {reviews[index]?.[product?.product_id]?.original?.data ||
                        0}{" "}
                      Reviews
                    </span>
                  </div>
                  <div className="bottom">
                    <div
                      onClick={() => {
                        removeMutation.mutate({
                          basketId: product?.basket_id,
                          productId: product?.product_id,
                          productColor: product?.product_color,
                        });
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
                          increaseMutation.mutate({
                            productId: product?.product_id,
                            productColor: product?.product_color,
                          });
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
                          decreaseMutation.mutate({
                            productId: product?.product_id,
                            productColor: product?.product_color,
                          });
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
