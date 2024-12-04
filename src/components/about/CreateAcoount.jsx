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
        <h4>Maliyyələrinizi idarə edin. Pulsuz hesab yaradın.</h4>
        <Link to="/register">Qeydiyyatdan keçin</Link>
      </div>
    </section>
  );
}

export default CreateAcoount;
