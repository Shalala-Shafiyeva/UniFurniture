import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

function Articles() {
  return (
    <section className="articles" data-aos="fade-up">
      <div className="containerArticle">
        <div className="head">
          <div className="txt">
            <h3 className="middleTxt">
              Biz növbəti nəsil bankçılıq təcrübəsiyik
            </h3>
            <p>
              Maliyyə idarəetməsini sadələşdirən innovativ bankçılıq təcrübəsi
              təklif edirik. Bizim inkişaf etmiş həllərimiz bu günün sürətlə
              dəyişən dünyasının tələblərinə cavab vermək üçün dizayn edilib,
              hər addımda rahatlıq və təhlükəsizlik təmin edir.
            </p>
          </div>
          <div className="btns">
            <Link to="#">BÜTÜN MƏQALƏLƏR</Link>
            <Link to="/login" className="getStart">
              Başlayın
            </Link>
          </div>
        </div>
        <div className="articleItems">
          {data.homeArticles.slice(0, 3).map((article) => (
            <div className="articleItem">
              <div className="img">
                <img src={article.img} alt="Image" />
              </div>
              <div className="context">
                <span className="title">{article.title}</span>
                <Link to="#">
                  <span>DAHA ƏTRAFLI</span>
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
