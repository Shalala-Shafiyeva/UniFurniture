import React from "react";
import { Link } from "react-router-dom";

function Generate() {
  return (
    <section className="generate" data-aos="fade-up">
      <img
        className="design item1"
        src="/images/designright1.png"
        alt="Design"
      />
      <img
        className="design item2"
        src="/images/designright2.png"
        alt="Design"
      />
      <img
        className="design item3"
        src="/images/designleft1.png"
        alt="Design"
      />
      <div className="container">
        <div className="box">
          <div className="img">
            <img src="/images/generate1.png" alt="Image" />
          </div>
          <div className="content">
            <div className="title">Generate lesds effortlessly</div>
            <p>
              You’ve probably wondered at some point. How can we enhance lead
              generation for your business? Worry no more because we have your
              back and provide you with the most effective telemarketing
              strategies.
            </p>
            <Link to="#">Learn more</Link>
          </div>
        </div>
        <div className="box">
          <div className="content">
            <div className="title">Generate lesds effortlessly</div>
            <p>
              You’ve probably wondered at some point. How can we enhance lead
              generation for your business? Worry no more because we have your
              back and provide you with the most effective telemarketing
              strategies.
            </p>
            <Link to="#">Read more</Link>
          </div>
          <div className="img">
            <img src="/images/generate2.png" alt="Image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Generate;
