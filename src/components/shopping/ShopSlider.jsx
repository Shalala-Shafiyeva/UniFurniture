import React, { useEffect, useState } from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../../data.json";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";

function ShopSlider() {
  const [sliders, setSliders] = useState([]);
  const fetchSliders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/shop/promotion/slider/published",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setSliders(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSliders();
  }, []);
  return (
    sliders && (
      <section className="shopSlider">
        <Swiper
          className="swiper"
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {sliders?.map((slider) => {
            return (
              <SwiperSlide className="cover" key={slider.id}>
                <div className="content">
                  <span className="title">{slider.subtitle}</span>
                  <h3>
                    <span className={slider.percent < 40 ? "orange" : "green"}>
                      {slider.title}
                    </span>{" Qədər"}
                    Endirim
                  </h3>
                  <p>{slider.text}</p>
                  <Link
                    to="/shop"
                    className={
                      +slider.title.slice(0, -1) < 40 ? "bgOrange" : "bgGreen"
                    }
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <span>İndi Alın</span>
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
    )
    // without backend <section className="shopSlider">
    //   <Swiper
    //     className="swiper"
    //     modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
    //     spaceBetween={30}
    //     slidesPerView={"auto"}
    //     loop={true}
    //     autoplay={{ delay: 3000, disableOnInteraction: false }}
    //   >
    //     {data.shopSlider.map((slider) => {
    //       return (
    //         <SwiperSlide className="cover" key={slider.id}>
    //           <div className="content">
    //             <span className="title">{slider.title}</span>
    //             <h3>
    //               Upto{" "}
    //               <span className={slider.percent < 40 ? "orange" : "green"}>
    //                 {slider.percent}%
    //               </span>{" "}
    //               Off
    //             </h3>
    //             <p>{slider.text}</p>
    //             <Link
    //               to="/shop"
    //               className={slider.percent < 40 ? "bgOrange" : "bgGreen"}
    //               onClick={() => {
    //                 window.scrollTo({ top: 0, behavior: "smooth" });
    //               }}
    //             >
    //               <span>Shop Now</span>
    //               <img src="/images/shop/arrow.png" alt="Shop Now" />
    //             </Link>
    //           </div>
    //         </SwiperSlide>
    //       );
    //     })}

    //     <div className="swiper-button-prev"></div>
    //     <div className="swiper-button-next"></div>
    //   </Swiper>
    // </section>
  );
}

export default ShopSlider;
