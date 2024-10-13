import React from "react";
import { Link } from "react-router-dom";

function Impact() {
  return (
    <section className="impact" data-aos="fade-up">
      <div className="container">
        <div className="head">
          <div className="left">
            <span className="middleTxt">We have impactful numbers</span>
            <span className="smallGrey">
              Risus elementum fringilla scelerisque varius facilisi aliquam
              molestie porttitor egestas consequat ut fringilla velit molestie
              quis vel.
            </span>
          </div>
          <div className="right">
            <Link className="getStart" to="/login">
              Get Started
            </Link>
          </div>
        </div>
        <div className="rating">
          <div className="top">
            <div>
              <span>98%</span>
              <span>Customer satisfaction</span>
            </div>
            <div>
              <span>100K+</span>
              <span>New users per week</span>
            </div>
          </div>
          <div className="bottom">
            <div>
              <span>205M+</span>
              <span>Monthly active users</span>
            </div>
            <div>
              <span>55%</span>
              <span>Growth year-over-year</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Impact;
