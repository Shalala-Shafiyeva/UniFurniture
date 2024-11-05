import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function AboutTeamTitleEdit() {
  const { id } = useParams();

  const [value, setValue] = useState("");
  const fetchTitle = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-team-title/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      console.log(result.data);
      setValue(result.data.title);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchTitle();
  }, []);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", value);
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-team-title/edit/" + id,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});

        navigate("/dashboard/about/team");
      }
    } catch (error) {
      console.error("Error: ", error);
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
                <h2>Team title of About page</h2>
                <h3>Edit title</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={handleFormSubmit}
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        value={value}
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                        name="title"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Edit
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

export default AboutTeamTitleEdit;
