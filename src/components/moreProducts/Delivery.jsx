import React from "react";

function Delivery() {
  return (
    <section className="delivery">
      <div className="container">
        <div className="boxs">
          <div className="box">
            <div className="img">
              <img src="/images/shipping.png" alt="Shipping" />
            </div>
            <div className="desc">
              <span>Fast & free shipping</span>
              <p>
                Every single order ships for free. No minimums, no tiers, no
                fine print whatsoever.
              </p>
            </div>
          </div>
          <div className="box">
            <div className="img">
              <img src="/images/design.png" alt="Design" />
            </div>
            <div className="desc">
              <span>Modular, easy-to-move design</span>
              <p>
                Our innovative modular design is driven by the belief that
                furniture should fit this home
              </p>
            </div>
          </div>
          <div className="box">
            <div className="img">
              <img src="/images/design.png" alt="Material" />
            </div>
            <div className="desc">
              <span>Durable, premium materials</span>
              <p>
                We use materials like sustainably-forested wood, strengthened
                steel hardware
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Delivery;
