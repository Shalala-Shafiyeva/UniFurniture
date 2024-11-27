import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function NextGenBanking() {
  return (
    <section className="nextBanking " data-aos="fade-up">
      <div className="container">
        <div className="cover">
          <div className="diagram">
          <h5 className="middleTxt">
  We are the next-gen banking experience
</h5>
<span className="smallGrey">
  We offer a seamless and innovative banking solution designed to simplify financial management and empower 
  your financial journey.
</span>
<div className="imgDiagram">
  <img src="/images/home/diagram.png" alt="Diagram" />
  <span className="smallGrey">Earning & Expense Reports</span>
</div>
<div className="imgCripto">
  <img src="/images/home/cripto.png" alt="Crypto" />
  <span>Cryptocurrencies Supported</span>
</div>
<div className="imgSupport">
  <img src="/images/home/classsupport.png" alt="Image" />
  <span>World-Class Support</span>
  <span>
    Access expert support anytime, anywhere, with dedicated customer service to address your needs.
  </span>

            </div>
          </div>
          <div className="right">
            <div className="btns">
              <Link className="createAccountBtn" to="/register">Create Account</Link>
              <Link className="loginBtn" to="/login">Sign In</Link>
            </div>
            <div className="app">
              <div className="title">Mobile and desktop app</div>
              <div className="imgPhone">
                <img src="/images/home/phone.png" alt="Phone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NextGenBanking;
