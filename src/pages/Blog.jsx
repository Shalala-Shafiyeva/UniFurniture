import React from "react";
import Header from "../components/header/Header";
import Hero from "../components/blog/Hero";
import Newletter from "../components/blog/Newletter";
import LatestArticles from "../components/blog/LatestArticles";
import CreateAccount from "../components/blog/CreateAccount";
import Footer from "../components/footer/Footer";
import "../components/blog/blog.css";
import "../components/blog/blogResponsive.css";
import { Helmet } from "react-helmet";

function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <Header />
      <Hero />
      <Newletter />
      <LatestArticles />
      <CreateAccount />
      <Footer />
    </>
  );
}

export default Blog;
