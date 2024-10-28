import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

function AboutBanner() {
  const [banners, setBanners] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/dashboard/about/banner",
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const result = await response.json();
      console.log(result);
      console.log(result.data);
      setBanners(result.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }, []);

  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const initialState = {
    title: "",
    content: content,
    image: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Banner Content:", content);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", content);
    formData.append("image", values.image);
    try {
      const response = await fetch(
        "http://localhost:8000/api/dashboard/about/banner",
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

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error creating banner:", error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-8 p-4">
          <h2>Banner of About page</h2>
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
              {errors.title && <p className="text-danger">{errors.title}</p>}
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
              {errors.image && <p className="text-danger">{errors.image}</p>}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="row p-4">
        <h2>Banners of About page</h2>
        {banners.length == 0 ? (
          <p>No banner found</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <td scope="col">Title</td>
                <td scope="col">Content</td>
                <td scope="col">Image</td>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td>{banner.title}</td>
                  <td>{banner.content}</td>
                  <td>
                    <img width="100" src={`http://localhost:8000/storage/${banner.image}`} alt="Banner" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AboutBanner;
