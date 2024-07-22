import React from "react";
import data from "../../data.json";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Slider() {
  return (
    <section className="slider">
      <div className="containerSlider">
        <Swiper
          className="swiper"
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            // el: ".swiper-pagination",
            // type: "bullets",
          }}
          //   scrollbar={{ draggable: true }}
          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log("slide change")}
          loop={true}
        >
          {data.systemSlider.map((slider) => {
            return (
              <SwiperSlide className="cover" key={slider.id}>
                <div className="img">
                  <img src={slider.img} alt="Slider" />
                </div>
                <div className="content">
                  <span className="title">{slider.title}</span>
                  <p>{slider.description}</p>
                  <span className="name">{slider.name}</span>
                  <span className="role">{slider.role}</span>
                </div>
              </SwiperSlide>
            );
          })}

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </section>
  );
}

export default Slider;
