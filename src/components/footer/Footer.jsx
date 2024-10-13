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
                Lorem ipsum Dolor Sit amet, Consectetur Adipiscing Elit, Sed Do
                Eusmod Tempor Incididunt Ut Labore Et Dolore Magna Alique Ad
                Minim
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
                <span className="title">Product</span>
                <ul>
                  <li>
                    <Link to="#">-Inspiration</Link>
                  </li>
                  <li>
                    <Link to="#">-Blocks</Link>
                  </li>
                  <li>
                    <Link to="#">-Templates</Link>
                  </li>
                  <li>
                    <Link to="#">-Universe</Link>
                  </li>
                  <li>
                    <Link to="#">-Pricing</Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <span className="title">Resources</span>
                <ul>
                  <li>
                    <Link to="#">-Case Studies</Link>
                  </li>
                  <li>
                    <Link to="#">-Security</Link>
                  </li>
                  <li>
                    <Link to="#">-Enterprise</Link>
                  </li>
                  <li>
                    <Link to="#">-Apl</Link>
                  </li>
                  <li>
                    <Link to="#">-Integrations</Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <span className="title">Company</span>
                <ul>
                  <li>
                    <Link
                      to="/about"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      -About
                    </Link>
                  </li>
                  <li>
                    <Link to="#">-Careers</Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      -Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="#">-Contact</Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      -Services
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span>Copynighted By @2023 Engej</span>
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
