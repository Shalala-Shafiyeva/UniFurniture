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
            Lorem Ipsum is simply dummy text of the printing and typr set
            industry. printing and lorem Ipsum dummy text.
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
