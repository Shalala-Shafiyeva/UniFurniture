import React from "react";
import { Link } from "react-router-dom";

function Discover() {
  return (
    <section className="discover">
      <div className="container">
        <div className="content">
          <h3>
            Discover the <span>best furnitures</span>
          </h3>
          <span>
          Explore a wide range of premium furniture designed to bring style,
           comfort, and functionality to your space. 
          Transform your home or office with pieces crafted to suit your unique taste and needs.
          </span>
          <Link to="/login">Get Started</Link>
        </div>
        <div className="img">
          <img src="/images/discover.png" alt="Image" />
        </div>
      </div>
    </section>
  );
}

export default Discover;
