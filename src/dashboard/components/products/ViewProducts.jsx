import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setProducts(result.data || []);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/product/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  const handlePublish = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/product/publish/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/product/unpublish/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div className="layoutSidenav d-flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="container-fluid mt-5">
          <main>
            <div className="row p-4 d-flex justify-content-center">
              <div className="col-6">
                <h2>View All Products</h2>
              </div>
            </div>
            <div className="row p-4">
              <div className="col">
                <h4>Product Count: {products.length}</h4>
                {!products.length ? (
                  <h2>There is no product</h2>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Full Title</th>
                        <th scope="col">Image</th>
                        {/* <th scope="col">Text</th>
                        <th scope="col">Description</th> */}
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Type</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Has Stock</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Characteristics</th>
                        <th scope="col">Colors</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <th scope="row">{product.id}</th>
                          <td>{product.name}</td>
                          <td>{product.full_title}</td>
                          <td>
                            <img
                              width="100"
                              src={`http://localhost:8000/storage/${product.image}`}
                              alt="Product"
                            />
                          </td>
                          {/* <td>{product.text}</td>
                          <td>{product.description}</td> */}
                          <td>{product.price}</td>
                          <td>{product.category.name}</td>
                          <td>{product.type.name}</td>
                          <td>{product.stock}</td>
                          <td>
                            {product.hasStock ? "In Stock" : "Out of Stock"}
                          </td>
                          <td>{product.discount}</td>
                          <td>{product.shipping}</td>
                          <td>
                            <ul className="list-group">
                              {product?.characteristics?.map(
                                (characteristic) => (
                                  <li
                                    key={characteristic.id}
                                    className="list-group-item"
                                  >
                                    {characteristic.characteristic}
                                  </li>
                                )
                              )}
                            </ul>
                          </td>
                          <td>
                            <ul className="list-group">
                              {product?.colors?.map((color) => (
                                <li key={color.id} className="list-group-item">
                                  {color.name}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="d-flex flex-column gap-2">
                            <Link
                              href={`/dashboard/products/${product.id}/edit`}
                              className="btn btn-primary"
                              to={`/dashboard/product/edit/${product.id}`}
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </button>
                            {product.is_publish ? (
                              <button
                                className="btn btn-warning"
                                onClick={() => handleUnpublish(product.id)}
                              >
                                Unpublish
                              </button>
                            ) : (
                              <button
                                className="btn btn-warning"
                                onClick={() => handlePublish(product.id)}
                              >
                                Publish
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
