import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function ColorEdit() {
  const [color, setColor] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const fetchType = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/color/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setColor(result.data || []);
      setValue(result.data.name);
    } catch (err) {
      console.log("Error fetching: ", err);
    }
  };

  useEffect(() => {
    fetchType(id);
  }, []);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/color/edit/" + id,
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
          navigate("/dashboard/product/color");
          return;
        }
        console.log(result);
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
                <h3>Edit product color</h3>
                <form
                  action=""
                  method="POST"
                  onSubmit={handleFormSubmit}
                  className="form d-flex flex-column gap-3"
                >
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      color="text"
                      name="name"
                      id="name"
                      className="form-control"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  {errors.name && <p className="text-danger">{errors.name}</p>}
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

export default ColorEdit;
