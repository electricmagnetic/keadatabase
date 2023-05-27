import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message, children, info }) => {
  const classNames = ['Error', 'alert', info ? 'alert-faded' : 'alert-primary'];
  return (
    <div className={classNames.join(' ')} role="alert">
      <p className="m-0">
        <em>{message}</em>
      </p>
      {children}
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  info: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

Error.defaultProps = {
  message: 'Error',
  info: false,
};

export default Error;
