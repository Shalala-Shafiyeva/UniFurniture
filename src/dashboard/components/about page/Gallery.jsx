import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

function Gallery() {
  const [images, setImages] = useState([]);
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const fetchImages = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-gallery/index",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setImages(result.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/about-gallery/delete/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setImages(images.filter((image) => image.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", values);
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-gallery/create",
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
        setValues(null);
        navigate("/dashboard/about/gallery");
      }
    } catch (error) {
      console.error("Error creating image:", error);
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
                <h2>Gallery of About page</h2>
                <h3>Create a new gallery image</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={(e) => {
                    handleFormSubmit(e);
                  }}
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        aria-describedby="titleHelp"
                        onChange={(e) => {
                          setValues(e.target.files[0]);
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
              <h2>Gallery images of About page</h2>
              {images.length == 0 ? (
                <p>No image found</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <td scope="col">Image</td>
                      <td scope="col">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((image) => (
                      <tr key={image.id}>
                        <td>
                          <img
                            width="100"
                            src={`http://localhost:8000/storage/${image.image}`}
                            alt="Banner"
                          />
                        </td>
                        <td>
                          <button
                          className="btn btn-danger"
                            onClick={() => {
                              handleDelete(image.id);
                            }}
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

export default Gallery;
