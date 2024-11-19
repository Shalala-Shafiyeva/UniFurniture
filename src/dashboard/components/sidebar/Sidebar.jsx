import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Sidebar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  });
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <div id="layoutSidenav_nav" className="col-2 min-vh-100">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <Link className="nav-link" href="index.html">
              <div className="sb-nav-link-icon">
                <i className="fLinks fLink-tachometer-alt"></i>
              </div>
              Dashboard
            </Link>
            <div className="sb-sidenav-menu-heading">Interface</div>
            <Link
              className="nav-link collapsed"
              to="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts1"
              aria-expanded="false"
              aria-controls="collapseLayouts1"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Products
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapseLayouts1"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion1"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/dashboard/products">
                  View All
                </Link>
                <Link className="nav-link" to="/dashboard/product">
                  Product Create
                </Link>
                <Link className="nav-link" to="/dashboard/product/category">
                  Categories
                </Link>
                <Link className="nav-link" to="/dashboard/product/type">
                  Types
                </Link>
                <Link className="nav-link" to="/dashboard/product/color">
                  Colors
                </Link>
              </nav>
            </div>
            <Link
              className="nav-link collapsed"
              to="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts2"
              aria-expanded="false"
              aria-controls="collapseLayouts2"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              About Page
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapseLayouts2"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/dashboard/about/banner">
                  Banner
                </Link>
                <Link className="nav-link" to="/dashboard/about/paralax">
                  Paralax section
                </Link>
                <Link className="nav-link" to="/dashboard/about/team">
                  Our team section
                </Link>
                <Link className="nav-link" to="/dashboard/about/number">
                  Numbers section
                </Link>
                <Link className="nav-link" to="/dashboard/about/gallery">
                  Gallery
                </Link>
              </nav>
            </div>
            <Link
              className="nav-link collapsed"
              to="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts4"
              aria-expanded="false"
              aria-controls="collapseLayouts4"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              FAQ
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapseLayouts4"
              aria-labelledby="headingFour"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/dashboard/faq">
                  View
                </Link>
                <Link className="nav-link" to="/dashboard/faq/options">Options</Link>
              </nav>
            </div>
            {/* <Link
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePages"
              aria-expanded="false"
              aria-controls="collapsePages"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-book-open"></i>
              </div>
              Pages
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapsePages"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav
                className="sb-sidenav-menu-nested nav accordion"
                id="sidenavAccordionPages"
              >
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseAuth"
                  aria-expanded="false"
                  aria-controls="pagesCollapseAuth"
                >
                  Authentication
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="pagesCollapseAuth"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" href="login.html">
                      Login
                    </Link>
                    <Link className="nav-link" href="register.html">
                      Register
                    </Link>
                    <Link className="nav-link" href="password.html">
                      Forgot Password
                    </Link>
                  </nav>
                </div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#pagesCollapseError"
                  aria-expanded="false"
                  aria-controls="pagesCollapseError"
                >
                  Error
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="pagesCollapseError"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordionPages"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" href="401.html">
                      401 Page
                    </Link>
                    <Link className="nav-link" href="404.html">
                      404 Page
                    </Link>
                    <Link className="nav-link" href="500.html">
                      500 Page
                    </Link>
                  </nav>
                </div>
              </nav>
            </div>
            <div className="sb-sidenav-menu-heading">Addons</div>
            <Link className="nav-link" href="charts.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              Charts
            </Link>
            <Link className="nav-link" href="tables.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Tables
            </Link> */}
            <Link className="nav-link" onClick={handleLogout}>Logout</Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          Start Bootstrap
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
