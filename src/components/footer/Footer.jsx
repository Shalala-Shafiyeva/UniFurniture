import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="top">
          <div className="wrapper">
            <div className="left">
              <span>Startply</span>
              <p>
                Startply, ehtiyaclarınıza uyğun innovativ həllər təqdim edən
                etibarlı tərəfdaşınızdır. Biz mükəmməl keyfiyyət və bənzərsiz
                mütəxəssisliklə hədəflərinizə asanlıqla çatmağınıza kömək etməyə
                çalışırıq.
              </p>
              <div className="sosialMedia">
                <Link to="https://www.facebook.com/">
                  <img src="/images/facebook.png" alt="Facebook" />
                </Link>
                <Link to="https://x.com">
                  <img src="/images/twitterwhite.png" alt="Twitter" />
                </Link>
                <Link to="https://www.instagram.com/">
                  <img src="/images/instagram.png" alt="Instaagramm" />
                </Link>
              </div>
            </div>
            <div className="right">
              <div className="col">
                <span className="title">Məhsul</span>
                <ul>
                  <li>
                    <Link to="#">-İlham</Link>
                  </li>
                  <li>
                    <Link to="#">-Bloklar</Link>
                  </li>
                  <li>
                    <Link to="#">-Şablonlar</Link>
                  </li>
                  <li>
                    <Link to="#">-Kainat</Link>
                  </li>
                  <li>
                    <Link to="#">-Qiymətləndirmə</Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <span className="title">Resurslar</span>
                <ul>
                  <li>
                    <Link to="#">-Vəziyyət Araşdırmaları</Link>
                  </li>
                  <li>
                    <Link to="#">-Təhlükəsizlik</Link>
                  </li>
                  <li>
                    <Link to="#">-İnkişaf</Link>
                  </li>
                  <li>
                    <Link to="#">-Apl</Link>
                  </li>
                  <li>
                    <Link to="#">-İnteqrasiyalar</Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <span className="title">Şirkət</span>
                <ul>
                  <li>
                    <Link
                      to="/about"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      -Haqqımızda
                    </Link>
                  </li>
                  <li>
                    <Link to="#">-Karyera</Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      -Bloq
                    </Link>
                  </li>
                  <li>
                    <Link to="#">-Əlaqə</Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      -Xidmətlər
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span>© 2023 Engej - Bütün Hüquqlar Qorunur</span>
          <div className="sosialMediaBottom">
            <Link to="https://www.facebook.com/">
              <img src="/images/facebook.png" alt="Facebook" />
            </Link>
            <Link to="https://x.com">
              <img src="/images/twitterwhite.png" alt="Twitter" />
            </Link>
            <Link to="https://www.instagram.com/">
              <img src="/images/instagram.png" alt="Instaagramm" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
