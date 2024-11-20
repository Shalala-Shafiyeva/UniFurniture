import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";

function Exellence() {
  const [exellences, setExellences] = useState([]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
  });
  const fetchExellences = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/shop-exellence", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setExellences(result.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchExellences();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/shop-exellence/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setExellences(exellences.filter((exellence) => exellence.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image);
    try {
      const response = await fetch(
        "http://localhost:8000/api/shop-exellence/create",
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
        setValues({
          title: "",
          content: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error creating banner:", error);
    }
  };

  const handlePublishBanner = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/shop-exellence/publish/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
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
                <h2>Exellence service section of Shop page</h2>
                <h3>Create a new exellence</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={(e) => {
                    handleFormSubmit(e);
                  }}
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
                        value={values.title}
                        onChange={(e) => {
                          setValues({ ...values, title: e.target.value });
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
                      <textarea
                        className="form-control"
                        value={values.content}
                        onChange={(e) => {
                          setValues({ ...values, content: e.target.value });
                        }}
                        name="content"
                      ></textarea>
                    </div>
                    {errors.content && (
                      <p className="text-danger">{errors.content}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        aria-describedby="imageHelp"
                        onChange={(e) => {
                          setValues({ ...values, image: e.target.files[0] });
                        }}
                        name="image"
                      />
                    </div>
                    {errors.image && (
                      <p className="text-danger">{errors.image}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
            <div className="row p-4">
              <h2>Exellence sections of Shop page</h2>
              {exellences?.length == 0 ? (
              <p>No item found</p>
            ) : (
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <td scope="col">Title</td>
                    <td scope="col">Content</td>
                    <td scope="col">Image</td>
                    <td scope="col">Publish</td>
                    <td scope="col">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {exellences?.map((exellence) => (
                    <tr key={exellence.id}>
                      <td>{exellence.title}</td>
                      <td>{exellence.content}</td>
                      <td>
                        <img
                          width="100"
                          src={`http://localhost:8000/storage/${exellence.image}`}
                          alt="Banner"
                        />
                      </td>
                      <td>
                        {exellence.is_publish ? "published" : "not published"}
                      </td>
                      <td className="d-flex gap-2">
                        <Link
                          className="btn btn-primary"
                          to={`/dashboard/shop/exellence/edit/${exellence.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(exellence.id)}
                        >
                          Delete
                        </button>
                        {!exellence.is_publish && (
                          <button
                            className="btn btn-success"
                            onClick={() => handlePublishBanner(exellence.id)}
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default Exellence;
