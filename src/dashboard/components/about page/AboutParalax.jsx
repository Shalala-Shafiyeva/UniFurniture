import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AboutParalax() {
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
        "http://localhost:8000/api/dashboard/about/paralax",
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
      console.error("Error creating paralax:", error);
    }
  };

  return (
    <div className="col-8 p-4">
      <h2>Paralax section of About page</h2>
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
            <label htmlFor="content">Content</label>
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
          {errors.content && <p className="text-danger">{errors.content}</p>}
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
          {errors.image && <p className="text-danger">{errors.image}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AboutParalax;
