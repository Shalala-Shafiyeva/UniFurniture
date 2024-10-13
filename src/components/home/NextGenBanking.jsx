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
              We are the next gen banking experience
            </h5>
            <span className="smallGrey">
              Risus elementum fringilla scelerisque varius facilisi aliquam
              molestie porttitor egestas consequat ut fringilla velit molestie
              quis vel.
            </span>
            <div className="imgDiagram">
              <img src="/images/home/diagram.png" alt="Diagram" />
              <span className="smallGrey">Earning & expense reports</span>
            </div>
            <div className="imgCripto">
              <img src="/images/home/cripto.png" alt="Crypto" />
              <span>Cryptocurrencies supported</span>
            </div>
            <div className="imgSupport">
              <img src="/images/home/classsupport.png" alt="Image" />
              <span>World-class support</span>
              <span>
                Ingelit consectetur tortor nunc aliquam consectetur semper augue
                at
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
