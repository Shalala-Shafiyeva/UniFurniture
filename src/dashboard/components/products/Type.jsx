import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Type() {
  const [types, setTypes] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTypes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/type",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setTypes(result.data || []);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/type/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setTypes(types.filter((type) => type.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/type/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: value }),
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});
        setValue("");

        if (response.status == 200) {
          //   navigate("/dashboard/products");
          return;
        }
        console.log(result);
      }
    } catch (error) {
      console.error("Error creating:", error);
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
                <h3>Create product Type</h3>
                <form
                  action=""
                  method="POST"
                  onSubmit={handleFormSubmit}
                  className="form d-flex flex-column gap-3"
                >
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                  <button className="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
            <div className="row p-4">
              {types.length == 0 ? (
                <h3>No types found</h3>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {types?.map((type) => (
                      <tr key={type.id}>
                        <td>{type.name}</td>
                        <td className="d-flex gap-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(type.id)}
                          >
                            Delete
                          </button>
                          <Link
                            className="btn btn-warning"
                            to={`/dashboard/product/type/edit/${type.id}`}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Type;
