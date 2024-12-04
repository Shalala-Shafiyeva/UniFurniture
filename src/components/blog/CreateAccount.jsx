import React from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  return (
    <section className="createAccountBlog" data-aos="fade-up">
      <div className="container">
        <div className="title">
          Maliyyənizin idarəsini ələ alın. Bu gün pulsuz hesab yaradın.
        </div>
        <Link to="/register">Qeydiyyatdan keçin</Link>
      </div>
    </section>
  );
}

export default CreateAccount;
