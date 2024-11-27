import React from "react";

function Newletter() {
  return (
    <section className="newsLetter" data-aos="fade-up">
      <div className="container">
        <div className="title">Subscribe to our newsletter</div>
        <p>
        Stay updated with the latest news, insights, and exclusive
         offers by subscribing to our newsletter. Join our community and never miss an update!
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
