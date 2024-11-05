import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function AboutNumberSubtitleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [subtitles, setSubtitles] = useState([]);
  const initialStateSubtitle = {
    title: "",
    content: "",
  };
  const [valueOfSubtitle, setValueOfSubtitle] = useState(initialStateSubtitle);

  useEffect(() => {
    const fetchSubtitle = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about-number-subtitle/" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        setValueOfSubtitle(result.data);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchSubtitle();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", valueOfSubtitle.title);
    formData.append("content", valueOfSubtitle.content);
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-number-subtitle/edit/" + id,
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

        navigate("/dashboard/about/number");
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
                <h3>Edit subtitle</h3>
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
                        value={valueOfSubtitle.title}
                        onChange={(e) => {
                          setValueOfSubtitle({
                            ...valueOfSubtitle,
                            title: e.target.value,
                          });
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
                      <label htmlFor="content">Content</label>
                      <input
                        type="text"
                        className="form-control"
                        id="content"
                        aria-describedby="titleHelp"
                        placeholder="Enter content"
                        value={valueOfSubtitle.content}
                        onChange={(e) => {
                          setValueOfSubtitle({
                            ...valueOfSubtitle,
                            content: e.target.value,
                          });
                        }}
                        name="content"
                      />
                    </div>
                    {errors.content && (
                      <p className="text-danger">{errors.content}</p>
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

export default AboutNumberSubtitleEdit;
