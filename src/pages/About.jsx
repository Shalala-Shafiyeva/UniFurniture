import React from "react";
import Header from "../components/header/Header";
import AboutHero from "../components/about/AboutHero";
import PhoneHero from "../components/about/PhoneHero";
import Paralax from "../components/about/Paralax";
import Banking from "../components/about/Banking";
import Team from "../components/about/Team";
import Paralax2 from "../components/about/Paralax2";
import WeDo from "../components/about/WeDo";
import CreateAcoount from "../components/about/CreateAcoount";
import "../components/about/about.css";
import Footer from "../components/footer/Footer";

function About() {
  return (
    <>
      <Header />
      <div className="aboutContainer">
        <AboutHero />
        <PhoneHero />
        <Paralax />
        <Banking />
        <Team />
        <Paralax2 />
        <WeDo />
        <CreateAcoount />
      </div>
      <Footer/>
    </>
  );
}

export default About;
