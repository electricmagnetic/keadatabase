import React from 'react';
import PropTypes from 'prop-types';

const Error = props => {
  return (
    <div className="Error">
      <div className="alert alert-danger" role="alert">
        <h1 className="alert-heading h4">Error</h1>
        {props.reason && <span className="reason">{props.reason}</span>}
      </div>
    </div>
  );
};

Error.propTypes = {
  reason: PropTypes.string,
};

Error.defaultProps = {
  reason: '',
};

export default Error;
