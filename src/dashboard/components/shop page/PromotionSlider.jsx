import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';

function PromotionSlider() {
    const [sliders, setSliders] = useState([]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: "",
    subtitle:"",
    content: "",
    image: "",
  });
  const fetchExellences = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/promotion-slider", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setSliders(result.data);
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
        `http://localhost:8000/api/promotion-slider/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setSliders(sliders.filter((slider) => slider.id !== id));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("content", values.content);
    formData.append("image", values.image);
    try {
      const response = await fetch(
        "http://localhost:8000/api/promotion-slider/create",
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
          subtitle: "",
          content: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  const handlePublishBanner = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/promotion-slider/publish/${id}`,
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
              <h2>Promotion Slider of Shop page</h2>
              <h3>Create a new slider</h3>
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
                    <label htmlFor="title">Subtitle</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subtitle"
                      aria-describedby="titleHelp"
                      placeholder="Enter subtitle"
                      value={values.subtitle}
                      onChange={(e) => {
                        setValues({ ...values, subtitle: e.target.value });
                      }}
                      name="subtitle"
                    />
                  </div>
                  {errors.subtitle && (
                    <p className="text-danger">{errors.subtitle}</p>
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
            {sliders?.length == 0 ? (
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
                {sliders?.map((slider) => (
                  <tr key={slider.id}>
                    <td>{slider.title}</td>
                    <td>{slider.subtitle}</td>
                    <td>{slider.content}</td>
                    <td>
                      <img
                        width="100"
                        src={`http://localhost:8000/storage/${slider.image}`}
                        alt="Banner"
                      />
                    </td>
                    <td>
                      {slider.is_publish ? "published" : "not published"}
                    </td>
                    <td className="d-flex gap-2">
                      <Link
                        className="btn btn-primary"
                        to={`/dashboard/shop/promotion-slider/edit/${slider.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(slider.id)}
                      >
                        Delete
                      </button>
                      {!slider.is_publish && (
                        <button
                          className="btn btn-success"
                          onClick={() => handlePublishBanner(slider.id)}
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
  )
}

export default PromotionSlider