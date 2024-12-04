import React from "react";
import { Link } from "react-router-dom";

function Generate() {
  return (
    <section className="generate" data-aos="fade-up">
      <img
        className="design item1"
        src="/images/designright1.png"
        alt="Design"
      />
      <img
        className="design item2"
        src="/images/designright2.png"
        alt="Design"
      />
      <img
        className="design item3"
        src="/images/designleft1.png"
        alt="Design"
      />
      <div className="container">
        <div className="box">
          <div className="img">
            <img src="/images/generate1.png" alt="Image" />
          </div>
          <div className="content">
            <div className="title">Asanlıqla potensial müştərilər yaradın</div>
            <p>
              Yəqin ki, bir vaxtlar düşünmüsünüz: Biznesiniz üçün potensial
              müştəri cəlb etməyi necə yaxşılaşdıra bilərik? Artıq narahat
              olmağa ehtiyac yoxdur, çünki biz sizin yanınızdayıq və sizə ən
              effektiv telemarketinq strategiyalarını təqdim edirik.
            </p>
            <Link
              to="#"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Daha ətraflı
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="content">
            <div className="title">Potensial müştəriləri asanlıqla yaradın</div>
            <p>
              Yəqin ki, bir vaxtlar düşünmüsünüz: Biznesiniz üçün potensial
              müştəri cəlb etməyi necə yaxşılaşdıra bilərik? Artıq narahat
              olmağa ehtiyac yoxdur, çünki biz sizin yanınızdayıq və sizə ən
              effektiv telemarketinq strategiyalarını təqdim edirik.
            </p>
            <Link
              to="#"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Daha ətraflı
            </Link>
          </div>
          <div className="img">
            <img src="/images/generate2.png" alt="Image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Generate;
