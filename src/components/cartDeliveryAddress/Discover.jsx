import React from "react";
import { Link } from "react-router-dom";

function Discover() {
  return (
    <section className="discover">
      <div className="container">
        <div className="content">
          <h3>
            Ən yaxşı <span>mebelləri</span> kəşf edin
          </h3>

          <span>
            Stil, komfort və funksionallığı məkanınıza gətirəcək geniş çeşiddə
            premium mebelləri kəşf edin. Evinizi və ya ofisinizi öz zövqünüzə və
            ehtiyaclarınıza uyğun hazırlanmış mebel parçaları ilə bəzəyin.
          </span>
          <Link to="/login">Başlayın</Link>
        </div>
        <div className="img">
          <img src="/images/discover.png" alt="Image" />
        </div>
      </div>
    </section>
  );
}

export default Discover;
