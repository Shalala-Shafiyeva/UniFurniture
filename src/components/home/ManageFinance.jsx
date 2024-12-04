import React from "react";
import { Link } from "react-router-dom";
import data from "../../data.json";

function ManageFinance() {
  return (
    <section className="manageFinannce" data-aos="fade-up">
      <div className="containerManage">
        <div className="head">
          <h3>Heç vaxt maliyyə idarə etmək bu qədər asan olmamışdı</h3>
          <span>
            Maliyyə gələcəyinizi asanlıqla idarə etmək üçün istifadəçi dostu
            alətlərimiz və xidmətlərimizlə nəzarətə götürün. Biz pul idarə
            etməyi sadə, effektiv və təhlükəsiz edirik ki, siz ən vacib şeylərə
            fokuslana biləsiniz.
          </span>
        </div>
        <div className="cards">
          {data.founders.map((card) => (
            <div className="card" key={card.id}>
              <div className="img">
                <img src={card.img} alt="Founder" />
              </div>
              <div className="content">
                <span className="name">
                  {card.name} {card.surname}
                </span>
                <span className="role">{card.role}</span>
                <p className="desc">{card.content}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/login" className="getStart">
          Başlayın
        </Link>
      </div>
    </section>
  );
}

export default ManageFinance;
