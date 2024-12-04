import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="content">
          <h2>
            Sürətli və <span>asan biznes</span> bank xidməti
          </h2>
          <p>
            Bizneslər üçün xüsusi olaraq nəzərdə tutulmuş, problemsiz və
            səmərəli bank xidməti təcrübəsi yaşayın. Biz maliyyə idarəçiliyini
            sadələşdiririk, beləliklə, siz işinizi böyütməyə fokuslana
            bilərsiniz, biz isə bankçılıq ehtiyaclarınızı qarşılayırıq.
          </p>
          <Link to="/login">Başlayın</Link>
        </div>
        <div className="img">
          <img src="/images/bloghero.png" alt="blog" />
          <Link to="/login">Başlayın</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
