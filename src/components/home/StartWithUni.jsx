import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

function StartWithUni() {
  return (
    <section className="startWithUni" data-aos="fade-up">
      <div className="containerStart">
        <div className="head">
          <div className="left">
            <h3>UniFurniture ilə işə necə başlamaq olar</h3>
            <p>
              UniFurniture ilə başlamaq üçün sadəcə bir hesab yaradın, geniş
              mebel seçimimizi nəzərdən keçirin və istədiyiniz məhsulları
              səbətinizə əlavə edin. Hazır olduğunuzda, ödəniş prosesinə keçin
              və alqı-satqınızı tamamlaymaq üçün asan addımları izləyin. Hər
              hansı bir sualınız varsa, müştəri dəstək komandamız sizə kömək
              etməyə hazırdır!
            </p>
          </div>
          <div className="btns">
            <Link className="createAccountBtn" to="/register">
              Hesab Yaradın
            </Link>
            <Link className="loginBtn" to="/login">
              Daxil ol
            </Link>
          </div>
        </div>
        <div className="contentUni">
          {data.startWithUni.map((card) => {
            if (card.id % 2 != 0) {
              return (
                <div className="box" key={card.id}>
                  <div className="img">
                    <img src={card.img} alt="Image" />
                  </div>
                  <div className="desc">
                    <span>{card.title}</span>
                    <p>{card.content}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="box" key={card.id}>
                  <div className="desc">
                    <span>{card.title}</span>
                    <p>{card.content}</p>
                  </div>
                  <div className="img">
                    <img src={card.img} alt="Image" />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

export default StartWithUni;
