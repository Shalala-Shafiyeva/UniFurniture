import React from "react";
import { Link } from "react-router-dom";

function CreateAcoount() {
  return (
    <section className="createAccount" data-aos="fade-up">
      <div className="circle item10"></div>
      <div className="circle item11"></div>
      <div className="circle item12"></div>
      <div className="circle item13"></div>
      <div className="circle item14"></div>
      {/* <div className="vector"></div> */}
      <div className="cover">
        <h4>Take the control of your finances. Create a free account.</h4>
        <Link to="/register">Sign up</Link>
      </div>
    </section>
  );
}

export default CreateAcoount;
