import React from "react";
import Header from "../components/header/Header";
import "../components/shopping/shopping.css";
import "../components/shopping/shoppingResponsive.css";
import ShoppingHero from "../components/shopping/ShoppingHero";
import Furnitures from "../components/shopping/Furnitures";
import ServiceCommite from "../components/shopping/ServiceCommite";
import ShopSlider from "../components/shopping/ShopSlider";
import Gallary from "../components/shopping/Gallary";
import PeopleSlider from "../components/shopping/PeopleSlider";
import StartShopping from "../components/shopping/StartShopping";
import Footer from "../components/footer/Footer";

function Shopping() {
  return (
    <>
      <Header />
      <ShoppingHero />
      <Furnitures />
      <ServiceCommite />
      <ShopSlider />
      <Gallary />
      <PeopleSlider />
      <StartShopping/>
      <Footer/>
    </>
  );
}

export default Shopping;
