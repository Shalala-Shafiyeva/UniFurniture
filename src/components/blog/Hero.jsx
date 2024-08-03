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
            Lorem ipsum dolor sit amet consectetur urna tellus tristique commodo
            donce pharetra elementum eleifend dignissim nam sitcommod.
          </p>
          <Link to="/login">Get Started</Link>
        </div>
        <div className="img">
          <img src="/images/bloghero.png" alt="blog" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
