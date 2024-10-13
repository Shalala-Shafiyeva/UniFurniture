import React from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function ServiceArticles() {
  return (
    <section className="articles" data-aos="fade-up">
      <div className="container">
        <div className="head">
          Browse <span>questions</span> by category
        </div>
        <div className="articleItemss">
          {data.servicesArticles.map((article) => (
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
        </div>
      </div>
    </section>
  );
}

export default ServiceArticles;
