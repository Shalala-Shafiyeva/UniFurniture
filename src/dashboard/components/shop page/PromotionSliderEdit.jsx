import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

function PromotionSliderEdit() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    content: "",
    image: "",
  });
  const navigate=useNavigate();
  const { id } = useParams();
  const fetchExellences = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/promotion-slider/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setValues(result.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchExellences();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("content", values.content);
    formData.append("image", values.image);
    try {
      const response = await fetch(
        "http://localhost:8000/api/promotion-slider/edit/" + id,
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
        navigate('/dashboard/shop/promotion-slider');
      }
    } catch (error) {
      console.error("Error creating:", error);
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

export default PromotionSliderEdit;
