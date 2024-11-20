import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";

function Article() {
  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState("");
  const [articles, setArticles] = useState([]);
  const [articleValues, setArticleValues] = useState({
    title: "",
    content: "",
    title_id: null,
  });
  const [errors, setErrors] = useState({});
  const handleTitleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article-title/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title: title }),
        }
      );
      const result = await response.json();
      if (response.status == 422) {
        setErrors(result.errors);
      } else {
        setErrors({});
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleTitleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article-title/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setTitles(titles.filter((title) => title.id !== id));
    } catch (error) {
      console.log("Delete error: ", error);
    }
  };

  const handlePublishTitle = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article-title/publish/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
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

  const handleArticleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article/create",
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
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleArticleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service-article/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.log("Delete error: ", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service/articles",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setArticles(result.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTitles();
    fetchArticles();
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
                <h2>Articles of Service page</h2>
                <h3>Create a new title</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  method="POST"
                  onSubmit={(e) => {
                    handleTitleCreate(e);
                  }}
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title of article</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create Title
                  </button>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-8 p-4">
                <h3>Create a new article</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  method="POST"
                  onSubmit={(e) => {
                    handleArticleCreate(e);
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
            <div className="row p-4">
              <h2>Titles of Service page</h2>
              {titles?.length == 0 ? (
                <p>No title found</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <td scope="col">Title</td>
                      <td scope="col">Published</td>
                      <td scope="col">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {titles?.map((title) => (
                      <tr key={title.id}>
                        <td>{title.name}</td>
                        <td>
                          {title?.is_publish ? "published" : "not published"}
                        </td>
                        <td className="d-flex gap-2">
                          <Link
                            className="btn btn-primary"
                            to={`/dashboard/service/article/title/edit/${title.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleTitleDelete(title.id)}
                          >
                            Delete
                          </button>
                          {!title.is_publish && (
                            <button
                              className="btn btn-danger"
                              onClick={() => handlePublishTitle(title.id)}
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
            <div className="row p-4">
              <h2>Articles of Service page</h2>
              {articles?.length == 0 ? (
                <p>No article found</p>
              ) : (
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <td scope="col">Title</td>
                      <td scope="col">Content</td>
                      <td scope="col">Section title</td>
                      <td scope="col">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article.id}>
                        <td>{article.title}</td>
                        <td>{article.content}</td>
                        <td>{article?.titles?.name}</td>
                        <td className="d-flex gap-2">
                          <Link
                            className="btn btn-primary"
                            to={`/dashboard/service/article/edit/${article.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleArticleDelete(article.id)}
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

export default Article;
