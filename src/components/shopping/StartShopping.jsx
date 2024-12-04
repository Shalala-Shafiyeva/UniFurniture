import React from "react";
import { Link } from "react-router-dom";

function StartShopping() {
  return (
    <section className="startShopping">
      <div className="container">
        <div className="cover">
          <h2>Həftə sonunu xilas etdik və daha çox təqdim olunan məhsulumuzu nəzərdən keçirin</h2>
          <Link to="/register">Alış-verişə Baslayın</Link>
        </div>
      </div>
    </section>
  );
}

export default StartShopping;
