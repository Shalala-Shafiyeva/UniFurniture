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
              <span>Tez və pulsuz çatdırılma</span>
              <p>
                Hər bir sifariş pulsuz göndərilir. Hər hansı bir minimum və ya
                limit yoxdur, hər şey açıq şəkildə təqdim edilir.
              </p>
            </div>
          </div>
          <div className="box">
            <div className="img">
              <img src="/images/design.png" alt="Design" />
            </div>
            <div className="desc">
              <span>Modul, asanlıqla hərəkət etdirilə bilən dizayn</span>
              <p>
                Bizim inqilabi modul dizaynımız, mebellərin hər evə uyğun olmalı
                olduğunu düşünərək hazırlanmışdır
              </p>
            </div>
          </div>
          <div className="box">
            <div className="img">
              <img src="/images/design.png" alt="Material" />
            </div>
            <div className="desc">
              <span>Dayanıqlı, premium materiallar</span>
              <p>
                Biz davamlı meşələrdən alınan taxta və möhkəmləndirilmiş polad
                hardware kimi materiallardan istifadə edirik
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Delivery;
