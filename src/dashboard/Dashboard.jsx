import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./components/css/bootstrap.css";
import Products from "./components/products/Products";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AboutBanner from "./components/about page/AboutBanner";
import AboutParalax from "./components/about page/AboutParalax";
import AboutTeam from "./components/about page/AboutTeam";
import AboutNumbers from "./components/about page/AboutNumbers";
import AboutWeDo from "./components/about page/AboutWeDo";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Products");

  const renderComponent = () => {
    switch (activeComponent) {
      case "AboutBanner":
        return <AboutBanner />;
      case "AboutParalax":
        return <AboutParalax />;
      case "AboutTeam":
        return <AboutTeam />;
      case "AboutNumbers":
        return <AboutNumbers />;
      case "AboutWeDo":
        return <AboutWeDo />;
      default:
        return <Products />;
    }
  };

  return (
      <div className="sb-nav-fixed">
        <Navbar />
        <div className="layoutSidenav d-flex">
          <Sidebar setActiveComponent={setActiveComponent} />
          <div id="layoutSidenav_content" className="container-fluid mt-5">
            <main>{renderComponent()}</main>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;
