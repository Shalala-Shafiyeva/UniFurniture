import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Category() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [value, setValue] = useState({ name: "", image: null });
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setCategories(result.data || []);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/category/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setCategories(categories.filter((type) => type.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("image", value.image);
    try {
      const response = await fetch("http://localhost:8000/api/category/store", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

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
                <h3>Create product Category</h3>
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
                      value={value.name}
                      onChange={(e) =>
                        setValue({ ...value, name: e.target.value })
                      }
                    />
                  </div>
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="form-control"
                      onChange={(e) =>
                        setValue({ ...value, image: e.target.files[0] })
                      }
                    />
                  </div>
                  {errors.image && (
                    <p className="text-danger">{errors.image}</p>
                  )}
                  <button className="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
            <div className="row p-4">
              {categories.length == 0 ? (
                <h3>No categories found</h3>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Icon</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((category) => (
                      <tr key={category.id}>
                        <td>{category.name}</td>
                        <td><img  maxwidth="100" maxheight="100" src={`http://localhost:8000/storage/${category.image}`} alt={category.name} /></td>
                        <td className="d-flex gap-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(category.id)}
                          >
                            Delete
                          </button>
                          <Link
                            className="btn btn-warning"
                            to={`/dashboard/product/category/edit/${category.id}`}
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

export default Category;
