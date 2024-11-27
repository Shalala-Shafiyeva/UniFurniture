import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

function Articles() {
  return (
    <section className="articles" data-aos="fade-up">
      <div className="containerArticle">
        <div className="head">
          <div className="txt">
            <h3 className="middleTxt">We are next gen banking experience</h3>
            <p>
            We offer an innovative banking experience 
            that simplifies financial management. 
            Our advanced solutions are designed to 
            meet the needs of today’s fast-paced world,
             providing convenience and security at every step.
            </p>
          </div>
          <div className="btns">
            <Link to="#">BROWSE ALL ARTICLES</Link>
            <Link to="/login" className="getStart">
              Get Started
            </Link>
          </div>
        </div>
        <div className="articleItems">
          {data.homeArticles.slice(0,3).map((article) => (
            <div className="articleItem">
              <div className="img">
                <img src={article.img} alt="Image" />
              </div>
              <div className="context">
                <span className="title">{article.title}</span>
                <Link to="#">
                  <span>LEAR MORE</span>
                  <img src="/images/home/Arrow1.png" alt="Lear more" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Articles;
