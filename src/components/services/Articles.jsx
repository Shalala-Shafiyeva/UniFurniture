import React from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function Articles() {
  return (
    <section className="articles">
      <div className="container">
        <div className="head">
          Browse <span>questions</span> by category
        </div>
        <div className="articleItems">
          {data.servicesArticles.map((article) => (
            <div className="article" key={article.id}>
              <div className="txt">
                <div className="title">{article.title}</div>
                <p>{article.content}</p>
              </div>
              <div className="btnn">
                <Link to="#">Browse article</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Articles;
