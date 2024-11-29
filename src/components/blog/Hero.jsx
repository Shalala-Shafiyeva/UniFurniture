import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="content">
          <h2>
            Fast & <span>easy business</span> banking service
          </h2>
          <p>
          Experience a seamless and efficient banking service designed 
          specifically for businesses. We simplify financial management, enabling you to focus on growing your 
          business while we take care of your banking needs.
          </p>
          <Link to="/login">Get Started</Link>
        </div>
        <div className="img">
          <img src="/images/bloghero.png" alt="blog" />
          <Link to="/login">Get Started</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
