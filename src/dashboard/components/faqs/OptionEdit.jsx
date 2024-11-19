import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

function OptionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});
  const fetchOptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/options/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setValue(result.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchOptions();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/option/edit/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name: value }),
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});
        navigate("/dashboard/faq/options");
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
            <div className="row">
              <div className="col-8 p-4">
                <h2>Options of FAQs</h2>
                <h3>Edit option {value.id}</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  method="POST"
                  onSubmit={(e) => {
                    handleFormSubmit(e);
                  }}
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="name">Option name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="titleHelp"
                        placeholder="Enter name"
                        name="name"
                        value={value.name}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-danger">{errors.name}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Edit Option
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default OptionEdit;
