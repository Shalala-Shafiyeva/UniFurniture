import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

function StartWithUni() {
  return (
    <section className="startWithUni">
      <div className="containerStart">
        <div className="head">
          <div className="left">
            <h3>How to get started with UniFurniturep</h3>
            <p>
              Aliquet aliquet nunc at orci purus id ultricies urna tempor id
              vitae quis nulla vitae neque nunc dolor velit amet odio vivamus in
              purus neque mi egestas aliquam in elit quam.
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
