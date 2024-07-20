import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

function Articles() {
  return (
    <section className="articles">
      <div className="containerArticle">
        <div className="head">
          <div className="txt">
            <h3 className="middleTxt">We are next gen banking experience</h3>
            <p>
              Risus elementum fringilla scelerisque varius facilisi aliquam
              molestie porttitor egestas consequat ut fringilla velit molestie
              quis vel.
            </p>
          </div>
          <div className="btns">
            <Link to="#">BROWSE ALL ARTICLLES</Link>
            <Link to="#" className="getStart">
              Get Started
            </Link>
          </div>
        </div>
        <div className="articleItems">
          {data.homeArticles.map((article) => (
            <div className="articleItem">
              <div className="img">
                <img src={article.img} alt="Image" />
              </div>
              <div className="context">
                <span className="title">{article.title}</span>
                <Link to="#">
                  <span>LEAR MORE</span>
                  <img src="/images/home/Arrow 1.png" alt="Lear more" />
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
