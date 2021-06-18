import React from 'react';

const Loader = ({ message = '' }) => (
  <div className="text-center m-5">
    <div className="text-primary m-1">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    {message && <div className="message">{message}</div>}
  </div>
);

export default Loader;
