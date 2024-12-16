import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import "../cart/cart.css";
import "../cart/cartResponsice.css";

function Cart({ openBasket, setOpenBasket }) {
  const queryClient = useQueryClient();

  const handleCloseCart = () => {
    setOpenBasket(false);
  };

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

  // Fetch count of products in the cart
  const { data: count = 0 } = useQuery("cartCount", async () => {
    const response = await fetch("http://localhost:8000/api/basket/productQty", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    return result.data || 0;
  });

  // Fetch total price
  const { data: total = 0 } = useQuery("cartTotal", async () => {
    const response = await fetch("http://localhost:8000/api/basket/index", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    return result.totalPrice || 0;
  });

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
          queryClient.invalidateQueries("addresses");
        } else {
          toast.error(data.message || "Məhsulun miqdarını artırmaq mümkün olmadı");
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
          queryClient.invalidateQueries("addresses");
        } else {
          toast.error(data.message || "Məhsulun miqdarını azaltmaq mümkün olmadı");
        }
      },
    }
  );

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
          queryClient.invalidateQueries("addresses");
        } else {
          toast.error(data.message || "Məhsulu səbətdən çıxarmaq olmadı");
        }
      },
    }
  );

  return (
    <section className={`cart ${!openBasket ? "closeCart" : ""}`}>
      <Toaster position="top-center" />
      <div className="modal">
        <div className="head">
          <div onClick={handleCloseCart} className="closeBtn">
            x
          </div>
          <span>Alış-veriş Səbəti</span>
          <span>{count}</span>
        </div>
        <div className="orderProducts">
          {isFetchingCart ? (
            <div className="loading">Yüklənir...</div>
          ) : products.length ? (
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
                    <span className="price">${product?.product?.price.toFixed(2)}</span>
                    <div className="qty">
                      <button
                        onClick={() =>
                          decreaseMutation.mutate({
                            productId: product?.product_id,
                            productColor: product?.product_color,
                          })
                        }
                        className="decrease"
                      >
                        -
                      </button>
                      <span>{product.qty}</span>
                      <button
                        onClick={() =>
                          increaseMutation.mutate({
                            productId: product?.product_id,
                            productColor: product?.product_color,
                          })
                        }
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
                  onClick={() =>
                    removeMutation.mutate({
                      basketId: product?.id,
                      productId: product?.product_id,
                      productColor: product?.product_color,
                    })
                  }
                >
                  <img src="/images/trash.svg" alt="Trash" />
                </div>
              </div>
            ))
          ) : (
            <div className="emptyCart">
              Görünür, hələ heç bir məhsul əlavə etməmisiniz.
            </div>
          )}
        </div>
        <div className="totalCount">
          <span>Toplam:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="btn">
          <Link to="/cart/deliveryaddress">
            <button disabled={products.length === 0} className="orderBtn">
              Sifariş et
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
