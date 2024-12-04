import React, { useEffect, useState } from "react";

function Paralax2() {
  const [title, setTitle] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about/number-title",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const result = await response.json();
        setTitle(result);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    const fetchSubtitles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about/number-subtitle",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();
        setSubtitles(result);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchTitle();
    fetchSubtitles();
  }, []);

  return (
    <section className="paralax2" data-aos="fade-up">
      <div className="cover">
        {/* {title.success && <span>{title.data.title}</span>}
        {subtitles.success && (
          <div className="nums">
            {subtitles.data.map((subtitle) => (
              <div className="left">
              <div className="per">
                <span>{subtitle.content}</span>
                <span>Customer satisfaction</span>
              </div>
              <div className="box">
                <div className="plus">
                  <span>205M+</span>
                  <span>Monthly active users</span>
                </div>
              </div>
            </div>
            ))}
          </div>
        )} */}
        <span>Bizim əhəmiyyətli rəqəmlərimiz</span>
        <div className="nums">
          <div className="left">
            <div className="per">
              <span>98%</span>
              <span>Müştəri məmnuniyyəti</span>
            </div>
            <div className="box">
              <div className="plus">
                <span>205M+</span>
                <span>Həftəlik yeni istifadəçilər</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="box2">
              <div className="per">
                <span>100K+</span>
                <span>Aylıq yeni istifadəçilər</span>
              </div>
            </div>
            <div className="plus">
              <span>55%</span>
              <span>İldən-ilə artım</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Paralax2;
