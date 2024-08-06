import React from 'react';
import '../components/notFound/notFound.css';
import Error from '../components/notFound/Error';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <div className="notFoundContainer">
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Header />
      <Error />
      <Footer />
      </div>
  )
}

export default NotFound