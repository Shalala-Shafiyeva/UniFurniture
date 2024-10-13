import React from "react";

function Newletter() {
  return (
    <section className="newsLetter" data-aos="fade-up">
      <div className="container">
        <div className="title">Subscribe to our newsletter</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisc elit viverra dignissim
          pellenteque in ac.
        </p>
        <div className="bottom">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
        </div>
      </div>
    </section>
  );
}

export default Newletter;
