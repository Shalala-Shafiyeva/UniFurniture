import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

function ManageFinance() {
  return (
    <section className="manageFinannce" data-aos="fade-up">
      <div className="containerManage">
        <div className="head">
          <h3>It have never been easier to manage your finances</h3>
          <span>
          Take control of your financial future with our easy-to-use tools and services. We make managing your 
          money simple, efficient, and secure, so you can focus on what matters most.
          </span>
        </div>
        <div className="cards">
          {data.founders.map((card) => (
            <div className="card" key={card.id}>
              <div className="img">
                <img src={card.img} alt="Founder" />
              </div>
              <div className="content">
                <span className="name">
                  {card.name} {card.surname}
                </span>
                <span className="role">{card.role}</span>
                <p className="desc">{card.content}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/login" className="getStart">
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default ManageFinance;
