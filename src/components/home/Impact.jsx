import React from "react";
import { Link } from "react-router-dom";

function Impact() {
  return (
    <section className="impact" data-aos="fade-up">
      <div className="container">
        <div className="head">
          <div className="left">
            <span className="middleTxt">Bizim əhəmiyyətli rəqəmlərimiz var</span>
            <span className="smallGrey">
            Uğurumuz, əldə etdiyimiz rəqəmlərlə özünü göstərir. Təəccüblü böyümə və sübut olunmuş nəticələrlə, 
        biz sənayedə və ondan kənarda əhəmiyyətli təsir göstərməyə davam edirik.

            </span>
          </div>
          <div className="right">
            <Link className="getStart" to="/login">
              Başlayın
            </Link>
          </div>
        </div>
        <div className="rating">
          <div className="top">
            <div>
              <span>98%</span>
              <span>Müştəri məmnuniyyəti</span>
            </div>
            <div>
              <span>100K+</span>
              <span>Həftəlik yeni istifadəçilər</span>
            </div>
          </div>
          <div className="bottom">
            <div>
              <span>205M+</span>
              <span>Aylıq yeni istifadəçilər</span>
            </div>
            <div>
              <span>55%</span>
              <span>İldən-ilə artım</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Impact;
