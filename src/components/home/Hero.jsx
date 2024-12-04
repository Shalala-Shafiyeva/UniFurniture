import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="homeHero">
        <div className="ellipse">
          <img src="/images/home/Buttom.png" alt="Ellipse" />
        </div>
        <div className="cover">
          <h3>
            Gəlin, alış-veriş və möhtəşəm maliyyə faydaları ilə böyük mükafatlar
            qazanın
          </h3>
          <p>
            WeConsult, məsləhətçi agentliklərinə yönəlmiş çoxlu şablonları olan
            premium Webflow şablonudur.
          </p>
          <Link
            to="/shop"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Alış-verişə Başla
          </Link>
        </div>
      </section>
      <div className="coverOut">
        <h3>
          Gəlin, alış-veriş və möhtəşəm maliyyə faydaları ilə böyük mükafatlar
          qazanın
        </h3>
        <p>
          WeConsult, məsləhətçi agentliklərinə yönəlmiş çoxlu şablonları olan
          premium Webflow şablonudur.
        </p>
        <Link to="/login">Başlayın</Link>
      </div>
    </>
  );
}

export default Hero;
