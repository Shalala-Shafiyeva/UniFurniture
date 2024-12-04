import React from "react";
import { Link } from "react-router-dom";

function Banking() {
  return (
    <section className="banking" data-aos="fade-up">
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
          Biz bütün dünyada əlçatanlıq üçün <span>bankçılığı</span> artırmaq
          missiyasındayıq
        </h3>
        <p>
          Biz hər kəsin, yerindən və ya şəraitindən asılı olmayaraq, bank
          xidmətlərinə çıxışını təmin etməyə sadiqik. Missiyamız maliyyə
          inklüzivliyi və innovativ həllər vasitəsilə icmaları gücləndirmək,
          inkişafı dəstəkləmək və hər kəs üçün imkanlar yaratmaqdır.
        </p>
        <Link className="getStart" to="/login">
          Başlayın
        </Link>
      </div>
    </section>
  );
}

export default Banking;
