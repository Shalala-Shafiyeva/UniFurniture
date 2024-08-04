import React from "react";
import { Link } from "react-router-dom";

function AboutHero() {
  return (
    <section className="hero">
      <div className="circle item1 darkGreen"></div>
      <div className="circle item2 green"></div>
      <div className="cover">
        <div className="desc">
          <h2>
            About out <span className="orange">company</span>
          </h2>
          <p>
            Suspendisse at faucibus platea leo dui orci lacinia quisque nec non
            nunc adipiscing a placerat massa. Neque nunc nulla urna orci
            malesuada semper nunc magna hac in tellus nibh purus tellus
            ullamcorper.
          </p>
          <Link className="getStart" to="/login">
            Get Started
          </Link>
        </div>
        <div className="img">
          <img src="/images/aboutheropng.png" alt="Main image" />
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
