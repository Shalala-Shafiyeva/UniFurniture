import React from "react";
import Header from "../components/header/Header";
import HelpCenter from "../components/services/HelpCenter";
import Generate from "../components/services/Generate";
import Articles from "../components/services/Articles";
import Footer from "../components/footer/Footer";
import '../components/services/services.css';
import "../components/services/servicesResponsive.css";

function Services() {
  return (
    <>
      <Header />
      <HelpCenter />
      <Generate />
      <Articles />
      <Footer />
    </>
  );
}

export default Services;
