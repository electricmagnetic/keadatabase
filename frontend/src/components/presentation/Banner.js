import React from 'react';
import PropTypes from 'prop-types';

import './Banner.scss';

/**
  Provides a consistent banner styling across components.
  */
const Banner = ({ backgroundImage, size, className, children }) => {
  var style = {};

  // Add background image
  if (backgroundImage) {
    style = {
      backgroundImage: 'url(' + backgroundImage + ')',
    };
  }

  // Add classes
  var classNames = ['Banner'];

  // Add size class
  classNames.push('size-' + size);

  // Add additional classes
  classNames.push(className);

  return (
    <div className={classNames.join(' ')} style={style}>
      <div className="container">{children}</div>
    </div>
  );
};

Banner.defaultProps = {
  size: 'large',
};

Banner.propTypes = {
  size: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  className: PropTypes.string,
};

export default Banner;
