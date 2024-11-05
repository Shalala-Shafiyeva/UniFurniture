import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function AboutNumber() {
  const [titles, setTitles] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const initialStateTitle = {
    title: "",
  };
  const initialStateSubtitles = {
    title: "",
    content: "",
  };
  const [valueOfTitle, setValueOfTitle] = useState(initialStateTitle);
  const [valueOfSubtitle, setValueOfSubtitle] = useState(initialStateSubtitles);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about-number-title",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        setTitles(result.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    const fetchSubtitles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about-number-subtitle",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        setSubtitles(result.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchTitles();
    fetchSubtitles();
  }, []);

  const handleTitleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", valueOfTitle.title);
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-number-title/create",
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
        setValueOfTitle(initialStateTitle);

        navigate("/dashboard/about/number");
      }
    } catch (error) {
      console.error("Error creating title:", error);
    }
  };
  const handleSubtitleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", valueOfSubtitle.title);
    formData.append("content", valueOfSubtitle.content);
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-number-subtitle/create",
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
        setValueOfSubtitle(initialStateSubtitles);

        navigate("/dashboard/about/number");
      }
    } catch (error) {
      console.error("Error creating :", error);
    }
  };

  const handleDeleteTitle = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/about-number-title/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setTitles(titles.filter((title) => title.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  const handleDeleteMember = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/about-number-subtitle/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setSubtitles(subtitles.filter((subtitles) => subtitles.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handlePublishTitle = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/about-number-title/publish/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("Error:", error);
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
                <h2>Numbers of About page</h2>
                <h3>Create a title</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={handleTitleFormSubmit}
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title of numbers section</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        value={valueOfTitle.title}
                        onChange={(e) => {
                          setValueOfTitle({
                            ...valueOfTitle,
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
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-8 p-4">
                <h3>Create a new subtitle</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={handleSubtitleFormSubmit}
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Subtitle</label>
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
                        title="title"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="surname">Content</label>
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
                    Create
                  </button>
                </form>
              </div>
            </div>
            <div className="row p-4">
              <h2>Titles of About page</h2>
              {titles.length == 0 ? (
                <p>No title found</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <td scope="col">Title</td>
                      <td scope="col">Published</td>
                      <td scope="col">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {titles.map((title) => (
                      <tr key={title.id}>
                        <td>{title.title}</td>
                        <td>
                          {title.is_publish ? "published" : "not published"}
                        </td>
                        <td className="d-flex gap-2">
                          <Link
                            className="btn btn-primary"
                            to={`/dashboard/about/number/title/edit/${title.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteTitle(title.id)}
                          >
                            Delete
                          </button>
                          {!title.is_publish && (
                            <button
                              className="btn btn-danger"
                              onClick={() => handlePublishTitle(title.id)}
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
            <div className="row p-4">
              <h2>Subtitles of number section About page</h2>
              {subtitles.length == 0 ? (
                <p>No subtitle found</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <td scope="col">Subtile</td>
                      <td scope="col">Content</td>
                      <td scope="col">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {subtitles.map((subtitle) => (
                      <tr key={subtitle.id}>
                        <td>{subtitle.title}</td>
                        <td>{subtitle.content}</td>
                        <td className="d-flex gap-2">
                          <Link
                            className="btn btn-primary"
                            to={`/dashboard/about/number/subtitle/edit/${subtitle.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteMember(subtitle.id)}
                          >
                            Delete
                          </button>
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

export default AboutNumber;
