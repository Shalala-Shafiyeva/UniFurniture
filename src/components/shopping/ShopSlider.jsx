import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../../data.json";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";

function ShopSlider() {
  return (
    <section className="shopSlider">
      <Swiper
        className="swiper"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={"auto"}
        loop={true}
      >
        {data.shopSlider.map((slider) => {
          return (
            <SwiperSlide className="cover" key={slider.id}>
              <div className="content">
                <span className="title">{slider.title}</span>
                <h3>
                  Upto{" "}
                  <span className={slider.percent < 40 ? "orange" : "green"}>
                    {slider.percent}%
                  </span>{" "}
                  Off
                </h3>
                <p>{slider.text}</p>
                <Link
                  to="/shop"
                  className={slider.percent < 40 ? "bgOrange" : "bgGreen"}
                >
                  <span>Shop Now</span>
                  <img src="/images/shop/arrow.png" alt="Shop Now" />
                </Link>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </section>
  );
}

export default ShopSlider;
