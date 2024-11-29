import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="notFound">
      <div className="img">
        <img src="/images/notfound.png" alt="Not Found" />
      </div>
      <h4>Oops! Page not found...!</h4>
      <span>
      This page is not available or has been deleted. Please check the URL or go to the homepage.
      </span>
      <Link to="/">
        <span>GO TO HOME PAGE</span>
        <img src="/images/Right.png" alt="Right Arrow" />
      </Link>
    </div>
  );
}

export default Error;
