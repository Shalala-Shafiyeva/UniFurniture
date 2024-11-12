import React from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";

function WeDo() {
  return (
    <section className="weDo" data-aos="fade-up">
      <h4>
        The values that shape everything we do at <span>Startply X</span>
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
        Get Started
      </Link>
    </section>
  );
}

export default WeDo;
