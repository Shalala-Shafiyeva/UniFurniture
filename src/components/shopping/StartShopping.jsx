import React from "react";
import { Link } from "react-router-dom";

function StartShopping() {
  return (
    <section className="startShopping">
      <div className="container">
        <div className="cover">
          <h2>Saved the weekend and browse our more featured product</h2>
          <Link to="/register">Start Shopping</Link>
        </div>
      </div>
    </section>
  );
}

export default StartShopping;
