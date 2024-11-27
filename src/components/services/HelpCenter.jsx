import React from "react";

function HelpCenter() {
  return (
    <section className="helpCenter">
      <div className="container">
        <div className="context">
          <h3>Help Center</h3>
          <p>
          If you have any questions or need assistance, our Help Center is here to provide the support you need. 
          Browse through our frequently asked questions or contact our support team for further help.
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
