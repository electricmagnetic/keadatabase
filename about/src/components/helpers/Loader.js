import React from 'react';

const Loader = () => (
  <div className="text-center m-5">
    <div className="text-primary m-1">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);

export default Loader;
