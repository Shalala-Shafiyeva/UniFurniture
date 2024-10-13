import React from "react";

function Paralax2() {
  return (
    <section className="paralax2" data-aos="fade-up">
      <div className="cover">
        <span>We have impactful numbers</span>
        <div className="nums">
          <div className="left">
            <div className="per">
              <span>98%</span>
              <span>Customer satisfaction</span>
            </div>
            <div className="box">
              <div className="plus">
                <span>205M+</span>
                <span>Monthly active users</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="box2">
              <div className="per">
                <span>100K+</span>
                <span>New users per week</span>
              </div>
            </div>
            <div className="plus">
              <span>55%</span>
              <span>Growth year-over-year</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Paralax2;
