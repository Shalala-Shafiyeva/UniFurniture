import React from "react";
import { Autoplay,Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../../data.json";
import "swiper/css";
import "swiper/css/navigation"; 
import { Link } from "react-router-dom";
function TrendFurnitures() {
  const randormProducts = [];
  for (let i = 0; i < 10; i++) {
    randormProducts.push(data.products[Math.floor(Math.random() * 10)]);
  }
  return (
    <section className="trendFurnitures">
      <div className="containerr">
        <div className="content">
          <h3>Buy trending Furnitures Products</h3>
          <p>
          Discover the latest furniture trends that combine modern design and functionality. 
          Elevate your living or working space with stylish pieces crafted for comfort and elegance.
           Shop now for the perfect additions to your decor.
          </p>
          <button className="explore">Explore More</button>
        </div>
        <div className="slider">
          <Swiper
            className="swiper"
            modules={[Autoplay,Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            navigation={{ nextEl: ".swiper-button-next"}}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {randormProducts.map((product) => {
              return (
                <SwiperSlide className="wrapper">
                  <Link to={`/product/${product.type}/${product.id}`}>
                    <div className="img">
                      <img src={product.img} alt="Product image" />
                    </div>
                    <div className="titleRating">
                      <span className="title">{product.fullTitle}</span>
                      <div className="stars">
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                        <img src="/images/star.png" alt="star" />
                      </div>
                    </div>
                    <span className="price">
                      ${product.priceBefore}-${product.price}
                    </span>
                  </Link>
                </SwiperSlide>
              );
            })}
            <div className="swiper-button-next"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default TrendFurnitures;
