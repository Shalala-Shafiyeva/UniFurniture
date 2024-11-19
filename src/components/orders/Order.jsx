import React, { useEffect, useState } from "react";
function Order() {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  function toggleAccordion(itemId) {
    setActiveItem((prev) => (prev === itemId ? null : itemId));
  }
  const fetchedOrders = async () => {
    const response = await fetch("http://localhost:8000/api/order/index", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    result.success ? setOrders(result.data) : setErrorMessage(result.message);
  };

  useEffect(() => {
    fetchedOrders();
  }, []);
  console.log(orders);
  return (
    <section className="order">
      <div className="container">
        <div className="wrapper">
          <h3 className="title">
            My <span>Orders</span>
          </h3>
          {errorMessage ? (
            <p className="error">{errorMessage}</p>
          ) : (
            <div className="order-cover">
              <div class="accordion" id="accordionExample">
                {orders?.map((order) => {
                  return (
                    <div
                      key={order?.id}
                      className={`accordionItem ${
                        order?.id === activeItem ? "active" : ""
                      }`}
                      onClick={(e) => {
                        toggleAccordion(order?.id);
                      }}
                    >
                      <img src="/images/home/accordion.png" alt="Open icon" />
                      <span>
                        {order?.uid} {order?.created_at}
                      </span>
                      {order?.order_detail?.map((products) => {
                        return (
                          <p>
                            <div className="img">
                              <img
                                src={`http://localhost:8000/storage/${products?.product?.image}`}
                                alt=""
                              />
                            </div>
                            <div className="description">
                              <p>Title: {products?.product?.name}</p>
                              <p>Price: ${products?.product?.price.toFixed(2)}</p>
                              <p>Qty: {products?.quantity}</p>
                              <p>Payment type: {order?.payment_type}</p>
                              <p>Delivery Address: {order?.address}</p>
                            </div>
                          </p>
                        );
                      })}
                      <p></p>
                    </div>
                    // <div class="accordion-item">
                    //   <h2 class="accordion-header" id={`heading${order?.id}`}>
                    //     <button
                    //       class="accordion-button"
                    //       type="button"
                    //       data-bs-toggle="collapse"
                    //       data-bs-target={`#collapse${order?.id}`}
                    //       aria-expanded="true"
                    //       aria-controls={`collapse${order?.id}`}
                    //     >
                    //       {order?.uid} {order?.created_at}
                    //     </button>
                    //   </h2>
                    //   <div
                    //     id={`collapse${order?.id}`}
                    //     class="accordion-collapse collapse"
                    //     aria-labelledby={`heading${order?.id}`}
                    //     data-bs-parent="#accordionExample"
                    //   >
                    //     <div class="accordion-body">
                    //       <strong>
                    //         This is the first item's accordion body.
                    //       </strong>{" "}
                    //       It is shown by default, until the collapse plugin adds
                    //       the appropriate classes that we use to style each
                    //       element. These classes control the overall appearance,
                    //       as well as the showing and hiding via CSS transitions.
                    //       You can modify any of this with custom CSS or
                    //       overriding our default variables. It's also worth
                    //       noting that just about any HTML can go within the{" "}
                    //       <code>.accordion-body</code>, though the transition
                    //       does limit overflow.
                    //     </div>
                    //   </div>
                    // </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Order;