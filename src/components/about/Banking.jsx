import React from "react";
import { Link } from "react-router-dom";

function Banking() {
  return (
    <section className="banking" data-aos="fade-up">
      <div className="circle item3 darkOrange"></div>
      <div className="circle item4"></div>
      <div className="circle item5"></div>
      <div className="circle item6"></div>
      <div className="circle item7"></div>
      <div className="circle item8"></div>
      <div className="circle item9"></div>
      <div className="imgs">
        <img src="/images/aboutbanking.png" alt="Banking" />
      </div>
      <div className="desc">
        <h3>
          We are on the mission to increase <span>banking </span>
          accessibility worldwide
        </h3>
        <p>
        We are dedicated to ensuring that everyone, regardless of location or
         circumstances, can access banking services. Our goal is to empower communities through financial 
        inclusivity and innovation, fostering growth and opportunities for all.
        </p>
        <Link className="getStart" to="/login">
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default Banking;
