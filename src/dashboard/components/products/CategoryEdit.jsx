import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function CategoryEdit() {
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState({ name: "", image: null });
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/category/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setCategory(result.data || []);
      setValue(result.data);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("image", value.image);
    try {
      const response = await fetch(
        "http://localhost:8000/api/category/edit/" + id,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});
        setValue("");

        if (response.status == 200) {
          navigate("/dashboard/product/category");
          return;
        }
      }
    } catch (error) {
      console.error("Error editing:", error);
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
                <h3>Edit product Category</h3>
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
                      onChange={(e) => setValue({ ...value, name: e.target.value})}
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
                      onChange={(e) => setValue({ ...value, image: e.target.files[0]})}
                    />
                  </div>
                  {errors.image && (
                    <p className="text-danger">{errors.image}</p>
                  )}
                  <button className="btn btn-primary">Edit</button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CategoryEdit;
