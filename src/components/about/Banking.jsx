import React from "react";
import { Link } from "react-router-dom";

function Banking() {
  return (
    <section className="banking">
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
          Lorem ipsum dolor sit amet consectetur adipiscing elit eque ipsum odio
          justo amet urna auctor at congue vulputate augue praesent mauris eu
          posuere pretium tellus viverra volutpat a est quis they it egestas id
          risus cursus venenatis.
        </p>
        <Link className="getStart" to="/login">
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default Banking;
