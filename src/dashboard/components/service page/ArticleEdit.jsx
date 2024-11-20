import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function ArticleEdit() {
  const [articleValues, setArticleValues] = useState({
    title: "",
    content: "",
    title_id: null,
  });
  const [titles, setTitles] = useState([]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const handleArticleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article/edit/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(articleValues),
        }
      );
      const result = await response.json();
      if (response.status == 422) {
        setErrors(result.errors);
      } else {
        setErrors({});
        navigate("/dashboard/service/article");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  const fetchArticle = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service/article/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setArticleValues(result.data || []);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const fetchTitles = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article-title",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setTitles(result.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchArticle();
    fetchTitles();
  }, []);
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div className="layoutSidenav d-flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="container-fluid mt-5">
          <main>
            <div className="row">
              <div className="col-8 p-4">
                <h3>Edit article</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  method="POST"
                  onSubmit={(e) => {
                    handleArticleEdit(e);
                  }}
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="name">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        name="title"
                        value={articleValues.title}
                        onChange={(e) =>
                          setArticleValues({
                            ...articleValues,
                            title: e.target.value,
                          })
                        }
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
                        type="text"
                        className="form-control"
                        id="content"
                        aria-describedby="titleHelp"
                        name="content"
                        value={articleValues.content}
                        onChange={(e) =>
                          setArticleValues({
                            ...articleValues,
                            content: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    {errors.content && (
                      <p className="text-danger">{errors.content}</p>
                    )}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="title_id">Content</label>
                      <select
                        className="form-control"
                        id="title_id"
                        aria-describedby="titleHelp"
                        name="title_id"
                        value={articleValues.title_id}
                        onChange={(e) =>
                          setArticleValues({
                            ...articleValues,
                            title_id: e.target.value,
                          })
                        }
                      >
                        <option value="">Choose Title of the section</option>
                        {titles?.map((title) => (
                          <option key={title?.id} value={title?.id}>{title?.name}</option>
                        ))}
                      </select>
                      {errors.title_id && (
                        <p className="text-danger">{errors.title_id}</p>
                      )}
                    </div>
                    {errors.content && (
                      <p className="text-danger">{errors.content}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create Article
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

export default ArticleEdit;
