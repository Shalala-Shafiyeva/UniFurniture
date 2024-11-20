import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function ArticleTitleEdit() {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const handleTitleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article-title/edit/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title: title }),
        }
      );
      const result = await response.json();
      if (response.status == 422) {
        setErrors(result.errors);
      } else {
        setErrors({});
        navigate("/dashboard/service/article");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  const fetchTitle = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article-title/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setTitle(result.data.name);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    fetchTitle();
  }, []);
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div className="layoutSidenav d-flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="container-fluid mt-5">
          <main>
            <div className="row">
              <div className="col-8 p-4">
                <h2>Articles of Service page</h2>
                <h3>Edit title</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  method="POST"
                  onSubmit={(e) => {
                    handleTitleEdit(e);
                  }}
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title of article</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Edit Title
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

export default ArticleTitleEdit;
