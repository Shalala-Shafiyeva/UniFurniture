import React from "react";

function Newletter() {
  return (
    <section className="newsLetter" data-aos="fade-up">
      <div className="container">
        <div className="title">Bizim bülletenə abunə olun</div>
        <p>
          Son xəbərlər, fikirlər və xüsusi təkliflərlə bağlı yenilikləri izləmək
          üçün bülletenimizə abunə olun. Cəmiyyətimizə qoşulun və heç bir
          yeniliyi qaçırmayın!
        </p>
        <div className="bottom">
          <input type="email" placeholder="Email-inizi daxil edin" />
          <button>Abunə ol</button>
        </div>
      </div>
    </section>
  );
}

export default Newletter;
