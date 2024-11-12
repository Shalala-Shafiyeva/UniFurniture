import React, { useEffect, useState } from "react";

function Paralax() {
  const [paralax, setParalax] = useState([]);
  useEffect(() => {
    const fetchParalax = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/about/paralax",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const result = await response.json();
        setParalax(result);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchParalax();
  }, []);

  return (
    <>
      {/* BACKEND -EN MELUMATLARI CIKME */}
      <section
        className="paralax"
        style={{
          backgroundImage:
            paralax && paralax.success
              ? `url('http://localhost:8000/storage/${paralax.data.image}')`
              : "none",
        }}
      >
        {paralax.success && (
          <div className="cover">
            <h3>{paralax.data.title}</h3>
            <p>{paralax.data.content}</p>
          </div>
        )}
      </section>
      {/* <section className="paralax">
      <div className="cover">
        <h3>The story behind how our company was founded</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur rutrum donec lorem arcu id a
          imperdiet quis non phasellus id dui convallis fames at arcu adipiscing
          pulvinar gravida integer elementum. sagittis malesuada in ornare
          commodo mattis tempor lectus ac.
        </p>
      </div>
    </section> */}
    </>
  );
}

export default Paralax;
