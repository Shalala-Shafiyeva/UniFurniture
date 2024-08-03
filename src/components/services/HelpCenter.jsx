import React from "react";

function HelpCenter() {
  return (
    <section className="helpCenter">
      <div className="container">
        <div className="context">
          <h3>Help Center</h3>
          <p>
            Sed viverra ipsum nunc aliquet bibendum enim gravida amet risun
            nulla eget felis nunc bibendum at varius vel.
          </p>
        </div>
        <div className="inp">
            <input type="text" placeholder="What do you need help with?"/>
            <img src="/images/search.png" alt="Seach" />
        </div>
      </div>
    </section>
  );
}

export default HelpCenter;
