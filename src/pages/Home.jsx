import React from "react";
import Hero from "../components/home/Hero";
import Header from "../components/header/Header";
import "../components/home/home.css";
import '../components/home/homeResponsive.css';
import NextGenBanking from "../components/home/NextGenBanking";
import Choose from "../components/home/Choose";
import Impact from "../components/home/Impact";
import ManageFinance from "../components/home/ManageFinance";
import StartWithUni from "../components/home/StartWithUni";
import CreateAccount from "../components/home/CreateAccount";
import Slider from "../components/home/Slider";
import QuestionsAccordion from "../components/home/QuestionsAccordion";
import Articles from "../components/home/Articles";
import Footer from "../components/footer/Footer";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div className="homeContainer">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header />
      <Hero />
      <NextGenBanking />
      <Choose />
      <Impact />
      <ManageFinance />
      <StartWithUni />
      <CreateAccount />
      <Slider />
      <QuestionsAccordion />
      <Articles />
      <Footer />
    </div>
  );
}

export default Home;
