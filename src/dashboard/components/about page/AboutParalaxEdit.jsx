import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

function AboutParalaxEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchParalax = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/dashboard/about/paralax/" + id,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();
        setValues(result.data);
        setContent(result.data.content);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchParalax();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Paaralax Content:", content);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", content);
    formData.append("image", values.image);
    try {
      const response = await fetch(
        "http://localhost:8000/api/dashboard/about/paralax/edit/" + id,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.status == 422) {
        setErrors(result.errors || {});
      } else {
        setErrors({});

        navigate("/dashboard/about/paralax");
      }
    } catch (error) {
      console.error("Error creating paralax:", error);
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
                <h2>Paralax of About page</h2>
                <h3>Edit paralax</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={handleFormSubmit}
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title of paralax</label>
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
                      <label htmlFor="content">Content of paralax</label>
                      <textarea
                        className="form-control"
                        name="content"
                        id="content"
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    {errors.content && (
                      <p className="text-danger">{errors.content}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="image">Image of paralax</label>
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

export default AboutParalaxEdit;
