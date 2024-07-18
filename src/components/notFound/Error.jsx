import React from 'react';
import './notFound.css';

function Error() {
  return (
    <div className="notFound">
        <div className="img">
          <img src="/images/notfound.png" alt="Not Found" />
        </div>
        <h4>Oops! Page not found...!</h4>
        <span>
          Velit dolor leo amet ultricies elementum ultricies urna magna bibendum
          enim mauris a tellus rhoncus. Sapien nisi viverra.
        </span>
        <a href="">
          <span>GO TO HOME PAGE</span>
          <img src="/images/Right.png" alt="Right Arrow" />
        </a>
      </div>
  )
}

export default Error