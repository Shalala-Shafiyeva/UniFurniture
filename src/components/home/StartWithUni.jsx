import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

function StartWithUni() {
  return (
    <section className="startWithUni" data-aos="fade-up">
      <div className="containerStart">
        <div className="head">
          <div className="left">
            <h3>How to get started with UniFurniturep</h3>
            <p>
            To get started with UniFurniture, simply create an account, browse 
            our wide selection of furniture, and add your desired items to your cart. Once you're ready, 
            proceed to checkout and follow the easy steps to complete your purchase. 
            If you have any questions along the way, our customer support team is here to assist you!
            </p>
          </div>
          <div className="btns">
            <Link className="createAccountBtn" to="/register">
              Create Account
            </Link>
            <Link className="loginBtn" to="/login">
              Sign In
            </Link>
          </div>
        </div>
        <div className="contentUni">
          {data.startWithUni.map((card) => {
            if (card.id % 2 != 0 ) {
              return (
                <div className="box" key={card.id}>
                  <div className="img">
                    <img src={card.img} alt="Image" />
                  </div>
                  <div className="desc">
                    <span>{card.title}</span>
                    <p>{card.content}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="box" key={card.id}>
                  <div className="desc">
                    <span>{card.title}</span>
                    <p>{card.content}</p>
                  </div>
                  <div className="img">
                    <img src={card.img} alt="Image" />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

export default StartWithUni;
