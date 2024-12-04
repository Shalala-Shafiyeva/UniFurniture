import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function NextGenBanking() {
  return (
    <section className="nextBanking " data-aos="fade-up">
      <div className="container">
        <div className="cover">
          <div className="diagram">
            <h5 className="middleTxt">
              Biz növbətçi nəsil bankçılıq təcrübəsiyik
            </h5>
            <span className="smallGrey">
              Biz maliyyə idarəçiliyini sadələşdirmək və maliyyə yolculuğunuzu
              gücləndirmək üçün nəzərdə tutulmuş, hamar və innovativ bankçılıq
              həlli təklif edirik.
            </span>
            <div className="imgDiagram">
              <img src="/images/home/diagram.png" alt="Diagram" />
              <span className="smallGrey">Qazanc və Xərc Hesabatları</span>
            </div>
            <div className="imgCripto">
              <img src="/images/home/cripto.png" alt="Crypto" />
              <span>Dəstəklənən Kriptovalyutalar</span>
            </div>
            <div className="imgSupport">
              <img src="/images/home/classsupport.png" alt="Image" />
              <span>Dünya Səviyyəli Dəstək</span>
              <span>
                İstədiyiniz vaxt, hər yerdə mütəxəssis dəstəyi əldə edin,
                ehtiyaclarınıza cavab vermək üçün xüsusi müştəri xidmətləri.
              </span>
            </div>
          </div>
          <div className="right">
            <div className="btns">
              <Link className="createAccountBtn" to="/register">
                Hesab Yarat
              </Link>
              <Link className="loginBtn" to="/login">
                Daxil Ol
              </Link>
            </div>
            <div className="app">
              <div className="title">Mobil və masaüstü tətbiq</div>
              <div className="imgPhone">
                <img src="/images/home/phone.png" alt="Phone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NextGenBanking;
