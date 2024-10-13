import React from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  return (
    <section className="createAccount" data-aos="fade-up">
      <div className="containerAcc">
        <div className="cover">
          <h4>
            Take the control of your finances. Create a free account today.
          </h4>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;
