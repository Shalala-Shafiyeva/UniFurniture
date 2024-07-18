import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="homeHero">
        <div className="ellipse">
            <img src="/images/home/buttom.png" alt="Ellipse" />
        </div>
      <div className="cover">
        <h3>
          Let’s Make Shopping & amazingFinance benefits with great rewards
        </h3>
        <p>
          WeConsult is a Multi Layout premium Webflow template focussed on
          consulting agencies.
        </p>
        <Link to='#'>Start Shopping</Link>
      </div>
    </section>
  );
}

export default Hero;
