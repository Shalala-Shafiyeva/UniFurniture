import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./style.css";

function AboutBanner() {
  const [content, setContent] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Banner Content:", content);
    // Можете добавить логику отправки данных на сервер
  };

  return (
    <div className="col-8 p-4">
      <h2>Banner of About page</h2>
      <form
        className="col-12 border p-4 d-flex flex-column gap-3"
        onSubmit={handleFormSubmit}
      >
        <div className="form-group">
          <label htmlFor="title">Title of banner</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="titleHelp"
            placeholder="Enter title"
          />
        </div>
        <div className="form-group height-50">
          <label htmlFor="content">Content of banner</label>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AboutBanner;
