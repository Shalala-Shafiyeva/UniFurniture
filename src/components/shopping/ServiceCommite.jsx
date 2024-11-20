import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ServiceCommite() {
  const [exellence, setExellence] = useState({});
  const fetchExellence = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api//shop/exellence/published",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setExellence(result.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchExellence();
  }, []);
  return (
    exellence && (
      <section className="serviceCommit">
        <div className="container">
          <div className="txt">
            <h2>Exellence in service is our commitment</h2>
            <p>
              We are a company that focuses on the furniture sector that has
              been established for 20 years, we are located in the us with 100
              branches in various regions. we provied various types of furniture
              of the hightest quality, of course with good service and other
              conveniences
            </p>
            <Link to="/login" className="getStart">
              Get Started
            </Link>
          </div>
          <div className="img">
            <img src="/images/shop/commit.png" alt="Image" />
          </div>
        </div>
      </section>
    )
    // <section className="serviceCommit">
    //   <div className="container">
    //     <div className="txt">
    //       <h2>Exellence in service is our commitment</h2>
    //       <p>
    //         We are a company that focuses on the furniture sector that has been
    //         established for 20 years, we are located in the us with 100 branches
    //         in various regions. we provied various types of furniture of the
    //         hightest quality, of course with good service and other conveniences
    //       </p>
    //       <Link to="/login" className="getStart">
    //         Get Started
    //       </Link>
    //     </div>
    //     <div className="img">
    //       <img src="/images/shop/commit.png" alt="Image" />
    //     </div>
    //   </div>
    // </section>
  );
}

export default ServiceCommite;
