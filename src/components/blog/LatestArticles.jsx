import React, { useState } from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function LatestArticles() {
  const filterBtns = ["All", "Business", "Finance", "Management"];
  const [filteredArticles, setFilteredArticles] = useState(data.homeArticles);
  const handleFilteredArticles = (articleCategory) => {
    if (articleCategory === "All") {
      setFilteredArticles(data.homeArticles);
    } else {
      setFilteredArticles(
        data.homeArticles.filter(
          (article) => article.category === articleCategory
        )
      );
    }
    console.log(filteredArticles);
  };
  return (
    <section className="latestArticles">
      <div className="container">
        <div className="top">
          <div className="title">
            Latest <span>Articles</span>
          </div>
          <div className="btns">
            {filterBtns.map((btn, index) => (
              <button
                onClick={() => {
                  handleFilteredArticles(btn);
                }}
                key={index}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
        <div className="bottom">
          <div className="cards">
            {filteredArticles.map((article) => (
              <div key={article.id} className="card">
                <div className="link">
                  <Link to="">
                    <img src="/images/shop/arrowleft.png" alt="Next" />
                  </Link>
                </div>
                <div className="img">
                  <img src={article.img} alt={article.category} />
                </div>
                <div className="title">{article.category}</div>
                <p>{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestArticles;
