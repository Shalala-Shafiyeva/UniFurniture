import React from "react";

function HelpCenter() {
  return (
    <section className="helpCenter">
      <div className="container">
        <div className="context">
          <h3>Yardım Mərkəzi</h3>
          <p>
            Əgər hər hansı sualınız varsa və ya köməyə ehtiyacınız varsa, Yardım
            Mərkəzimiz sizə lazım olan dəstəyi təmin etmək üçün buradadır.
            Tez-tez verilən suallara baxın və ya əlavə kömək üçün dəstək
            komandamızla əlaqə saxlayın.
          </p>
        </div>
        <div className="inp">
          <input type="text" placeholder="Sizə necə kömək edə bilərik?" />
          <img src="/images/search.png" alt="Seach" />
        </div>
      </div>
    </section>
  );
}

export default HelpCenter;
