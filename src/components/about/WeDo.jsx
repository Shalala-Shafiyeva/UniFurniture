import React from "react";
import data from "../../data.json";

function WeDo() {
  return (
    <section className="weDo">
      <h4>
        The values that shape everything we do at <span>Startply X</span>
      </h4>
      <div className="doCards">
        {data.weDo.map((card) => (
          <div key={card.id} className="card">
            <div className="img">
              <img src={card.img} alt="Emplyee" />
            </div>
            <div className="content">
              <span className="title">{card.title}</span>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="getStart">
        Get Started
      </a>
    </section>
  );
}

export default WeDo;
