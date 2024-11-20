import React, { useEffect, useState } from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function ServiceArticles() {
  const [title, setTitle] = useState("");
  const [articles, setArticles] = useState([]);
  const fetchTitle = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service/article/title",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setTitle(result.data || "");
    } catch (error) {}
  };
  const addClassToWord = (text) => {
    if (text) {
      return text.replace(/(questions)/gi, '<span class="orange">$1</span>');
    }
    return "";
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/service/published-articles",
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
    fetchTitle();
    fetchArticles();
  }, []);

  console.log(articles)

  return (
    <section className="articles" data-aos="fade-up">
      <div className="container">
        <div
          className="head"
          dangerouslySetInnerHTML={{ __html: addClassToWord(title.name) }}
        ></div>
        {/* <div className="head">
          Browse <span>questions</span> by category
        </div> */}
        <div className="articleItemss">
        {articles?.map((article) => (
            <div className="article" key={article.id}>
              <div className="txt">
                <div className="title">{article.title}</div>
                <p>{article.content}</p>
              </div>
              <div className="btnn">
                <Link
                  to="#"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Browse article
                </Link>
              </div>
            </div>
          ))}
          {/* {data.servicesArticles.map((article) => (
            <div className="article" key={article.id}>
              <div className="txt">
                <div className="title">{article.title}</div>
                <p>{article.content}</p>
              </div>
              <div className="btnn">
                <Link
                  to="#"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Browse article
                </Link>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
}

export default ServiceArticles;
