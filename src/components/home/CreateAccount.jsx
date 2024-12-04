import React from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  return (
    <section className="createAccount" data-aos="fade-up">
      <div className="containerAcc">
        <div className="cover">
          <h4>Maliyyə idarəetməsini ələ alın. Bu gün pulsuz hesab yaradın.</h4>
          <Link to="/register">Hesab yaradın</Link>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;
