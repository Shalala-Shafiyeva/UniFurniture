import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AboutBannerEdit() {
  const { id } = useParams();
  // const [banner, setBanner] = useState([]);
  
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/dashboard/about/banner/" + id,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();
        console.log(result.data);
        setValues(result.data);
        setContent(result.data.content);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchBanner();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Banner Content:", content);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", content);
    formData.append("image", values.image);
    try {
      const response = await fetch(
        "http://localhost:8000/api/dashboard/about/banner/edit/" + id,
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

        navigate("/dashboard/about/banner");
      }
    } catch (error) {
      console.error("Error creating banner:", error);
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
                <h2>Banner of About page</h2>
                <h3>Edit banner</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  onSubmit={handleFormSubmit}
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title of banner</label>
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
                      <label htmlFor="content">Content of banner</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setContent(data);
                        }}
                        name="content"
                      />
                    </div>
                    {errors.content && (
                      <p className="text-danger">{errors.content}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="image">Image of banner</label>
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

export default AboutBannerEdit;
