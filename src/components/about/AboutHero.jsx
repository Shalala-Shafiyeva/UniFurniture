import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AboutHero() {
  const [banner, setBanner] = useState([]);
  const addClassToWord = (text) => {
    const formattedText = text.replace(/(company)/gi, '<span class="orange">$1</span>');
    return formattedText;
  };
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/about/banner", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        setBanner(result);

      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchBanner();
  }, []);

  return (
    <section className="hero">
      <div className="circle item1 darkGreen"></div>
      <div className="circle item2 green"></div>
      
      {/* BACKEND -EN MELUMATLARI CIKME */}
      {banner.success && (
        <div className="cover">
          <div className="desc">
          <h2 dangerouslySetInnerHTML={{ __html: addClassToWord(banner.data.title) }} />
            <p>{banner.data.content}</p>
            <Link className="getStart" to="/login">
            Başlayın
            </Link>
          </div>
          <div className="img">
            <img
              src={`http://localhost:8000/storage/${banner.data.image}`}
              alt="Main image"
            />
          </div>
        </div>
      )}
      {/* <div className="cover">
        <div className="desc">
          <h2>
            About out <span className="orange">company</span>
          </h2>
          <p>
            Suspendisse at faucibus platea leo dui orci lacinia quisque nec non
            nunc adipiscing a placerat massa. Neque nunc nulla urna orci
            malesuada semper nunc magna hac in tellus nibh purus tellus
            ullamcorper.
          </p>
          <Link className="getStart" to="/login">
            Başlayın
          </Link>
        </div>
        <div className="img">
          <img src="/images/aboutheropng.png" alt="Main image" />
        </div>
      </div> */}
    </section>
  );
}

export default AboutHero;
