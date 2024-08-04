import React from "react";
import Header from "../components/header/Header";
import HelpCenter from "../components/services/HelpCenter";
import Generate from "../components/services/Generate";
import ServiceArticles from "../components/services/ServiceArticles";
import Footer from "../components/footer/Footer";
import '../components/services/services.css';
import "../components/services/servicesResponsive.css";

function Services() {
  return (
    <>
      <Header />
      <HelpCenter />
      <Generate />
      <ServiceArticles />
      <Footer />
    </>
  );
}

export default Services;
