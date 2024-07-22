import React from "react";
import data from "../../data.json";

function Gallary() {
  return (
    <section className="gallary">
      <div className="container">
        <div className="head">
          <h3>Our Decoration Gallary</h3>
          <p>
            You can monitor your beautiful home with the product we will provide
          </p>
        </div>
        {data.gallary.map((item) => (
          <div key={item.id} className="img">
            <img  src={item.img} alt="Image" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallary;
