import React from "react";
import data from "../../data.json";
import { Autoplay,Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

function PeopleSlider() {
  return (
    <section className="peopleSlider">
      <div className="container">
        <h2>What People Say</h2>
        <p>Know about our clients, we are a worldwide brand</p>
        <Swiper
          className="swiper"
          // install Swiper modules
          modules={[Autoplay,Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={"auto"}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          onSwiper={console.log(null)}
          onSlideChange={console.log(null)}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {data.peopleSlider.map((slide) => (
            <SwiperSlide className="swiperSlide" key={slide.id}>
              <div className="img">
                <img src={slide.img} alt={slide.role} />
              </div>
              <span className="name">{slide.name}</span>
              <span className="role">{slide.role}</span>
              <p>{slide.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default PeopleSlider;
