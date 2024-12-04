import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="notFound">
      <div className="img">
        <img src="/images/notfound.png" alt="Not Found" />
      </div>
      <h4>Səhifə tapılmadı...!</h4>
      <span>
        Bu səhifə mövcud deyil və ya silinib. Zəhmət olmasa URL-ni yoxlayın və
        ya ana səhifəyə gedin.
      </span>
      <Link to="/">
        <span>Ana Səhifəyə Get</span>
        <img src="/images/Right.png" alt="Right Arrow" />
      </Link>
    </div>
  );
}

export default Error;
