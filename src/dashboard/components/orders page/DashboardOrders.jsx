import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

function DashboardOrders() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/order/all-orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setOrders(result.data || []);
    } catch (error) {
      console.log("Orders fetching error: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleConfirmed = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/order/confirm/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        fetchOrders();
      }
    } catch (error) {
      console.log("Orders fetching error: ", error);
    }
  };

  const handleShipped = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/order/ship/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        fetchOrders();
      }
    } catch (error) {
      console.log("Orders fetching error: ", error);
    }
  };

  const handleDelivered = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/order/deliver/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        fetchOrders();
      }
    } catch (error) {
      console.log("Orders fetching error: ", error);
    }
  };

  const handleReturned = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/order/return/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        fetchOrders();
      }
    } catch (error) {
      console.log("Orders fetching error: ", error);
    }
  };

  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div className="layoutSidenav d-flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="container-fluid mt-5">
          <main>
            <div className="row">
              <div className="col-11 p-4">
                <h2>Client Orders</h2>
                {/* <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title of banner</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        value={values.title}
                        onChange={(e) => {
                          setValues({ ...values, title: e.target.value });
                        }}
                        name="title"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="image">Image of banner</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        aria-describedby="imageHelp"
                        onChange={(e) => {
                          setValues({ ...values, image: e.target.files[0] });
                        }}
                        name="image"
                      />
                    </div>
                    {errors.image && (
                      <p className="text-danger">{errors.image}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form> */}
              </div>
            </div>
            <div className="row p-4">
              <h2>Orders of all Users</h2>
              {orders.length == 0 ? (
                <p>No order found</p>
              ) : (
                orders.map((order) => (
                  <div class="accordion-item" key={order.id}>
                    <h2
                      class="accordion-header"
                      id={`panelsStayOpen-headingOne-${order.id}`}
                    >
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#panelsStayOpen-collapse-${order.id}`}
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        {order.uid} - {order.user.name} - {order.status} -{" "}
                        {order.created_at}
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapse-{{ order.id }}"
                      class="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne-{{ order.id }}"
                    >
                      <div class="accordion-body">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order?.order_detail?.map((orderDetail) => (
                              <tr key={orderDetail.id}>
                                <td>{orderDetail.product.name}</td>
                                <td>{orderDetail.quantity}</td>
                                <td>{orderDetail.price}</td>
                                <td>{orderDetail.total.toFixed(2)}</td>
                              </tr>
                            ))}
                            <tr>
                              <td className="text-end">Total</td>
                              <td>{order.total.toFixed(2)}</td>
                              {order.status == "PENDING" && (
                                <>
                                  <td className="text-end">Action</td>
                                  <td>
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                      onClick={() => {
                                        handleConfirmed(order.id);
                                      }}
                                    >
                                      Confirm
                                    </button>
                                  </td>
                                </>
                              )}
                              {order.status == "CONFIRMED" && (
                                <>
                                  <td className="text-end">Action</td>
                                  <td>
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                      onClick={() => {
                                        handleShipped(order.id);
                                      }}
                                    >
                                      Shipped
                                    </button>
                                  </td>
                                </>
                              )}
                              {order.status == "SHIPPED" && (
                                <>
                                  <td className="text-end">Action</td>
                                  <td>
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                      onClick={() => {
                                        handleDelivered(order.id);
                                      }}
                                    >
                                      DELIVERED
                                    </button>
                                  </td>
                                </>
                              )}
                              {order.status == "DELIVERED" && (
                                <>
                                  <td className="text-end">Action</td>
                                  <td>
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                      onClick={() => {
                                        handleReturned(order.id);
                                      }}
                                    >
                                      RETURNED
                                    </button>
                                  </td>
                                </>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardOrders;
