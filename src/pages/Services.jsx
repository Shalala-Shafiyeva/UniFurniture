import React, { useEffect } from "react";
import Header from "../components/header/Header";
import HelpCenter from "../components/services/HelpCenter";
import Generate from "../components/services/Generate";
import ServiceArticles from "../components/services/ServiceArticles";
import Footer from "../components/footer/Footer";
import "../components/services/services.css";
import "../components/services/servicesResponsive.css";
import { Helmet } from "react-helmet";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Services() {

  useEffect(()=>{
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Services</title>
      </Helmet>
      <Header />
      <HelpCenter />
      <Generate />
      <ServiceArticles />
      <Footer />
    </>
  );
}

export default Services;
