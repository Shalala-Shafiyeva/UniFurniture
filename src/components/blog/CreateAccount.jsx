import React from "react";
import { Link } from "react-router-dom";

function CreateAccount() {
  return (
    <section className="createAccountBlog">
      <div className="container">
        <div className="title">
          Take the control of your finances. Create a free account today.
        </div>
        <Link to="/register">Sign up</Link>
      </div>
    </section>
  );
}

export default CreateAccount;
