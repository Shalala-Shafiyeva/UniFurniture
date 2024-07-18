import React from 'react';
import '../components/notFound/notFound.css';
import Error from '../components/notFound/Error';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

function NotFound() {
  return (
    <div className="notFoundContainer">
      <Header />
      <Error />
      <Footer />
      </div>
  )
}

export default NotFound