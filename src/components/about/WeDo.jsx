import React from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function WeDo() {
  return (
    <section className="weDo" data-aos="fade-up">
      <h4>
        <span>Startply X</span>-də etdiyimiz hər şeyi formalaşdıran dəyərlər
      </h4>
      <div className="doCards">
        {data.weDo.map((card) => (
          <div key={card.id} className="card">
            <div className="img">
              <img src={card.img} alt="Employee" />
            </div>
            <div className="content">
              <span className="title">{card.title}</span>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/login" className="getStart">
        Başlayın
      </Link>
    </section>
  );
}

export default WeDo;
