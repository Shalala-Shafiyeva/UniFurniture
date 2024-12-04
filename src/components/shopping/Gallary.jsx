import React, { useEffect, useState } from "react";
// import data from "../../data.json";

function Gallary() {
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/about-gallery/index",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      setImages(result.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="gallary">
      <div className="container">
        <div className="head">
          <h3>Bizim Dekorasiya Qalereyamız</h3>
          <p>Təqdim edəcəyimiz məhsul ilə gözəl evinizi izləyə bilərsiniz</p>
        </div>
        {images.map((item) => (
          <div key={item.id} className="img">
            <img
              src={`http://localhost:8000/storage/${item.image}`}
              alt="Image"
            />
          </div>
        ))}
        {/* {data.gallary.map((item) => (
          <div key={item.id} className="img">
            <img  src={item.img} alt="Image" />
          </div>
        ))} */}
      </div>
    </section>
  );
}

export default Gallary;
