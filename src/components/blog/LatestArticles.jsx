import React, { useState } from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function LatestArticles() {
  const filterBtns = ["Hamısı", "Dizayn", "Estetika", "Məsləhətlər"];
  const [activeBtn, setActiveBtn] = useState("Hamısı");
  const [filteredArticles, setFilteredArticles] = useState(data.homeArticles);
  const handleFilteredArticles = (articleCategory) => {
    if (articleCategory === "Hamısı") {
      setFilteredArticles(data.homeArticles);
      setActiveBtn("Hamısı");
    } else {
      setFilteredArticles(
        data.homeArticles.filter(
          (article) => article.category === articleCategory
        )
      );
      setActiveBtn(articleCategory);
    }
    console.log(filteredArticles);
  };
  return (
    <section className="latestArticles" data-aos="fade-up">
      <div className="container">
        <div className="top">
          <div className="title">
            Ən son <span>Məqalələr</span>
          </div>
          <div className="btns">
            {filterBtns.map((btn, index) => (
              <button
                className={activeBtn === btn ? "active" : ""}
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
