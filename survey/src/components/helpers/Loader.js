import React from 'react';

const Loader = () => (
  <div className="d-flex justify-content-center m-3 text-primary">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loader;
