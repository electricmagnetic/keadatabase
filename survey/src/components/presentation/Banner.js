import React from 'react';
import PropTypes from 'prop-types';

import './Banner.scss';

const Banner = ({ backgroundImage, size, additionalClasses, children }) => {
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
  classNames.push(additionalClasses);

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
  additionalClasses: PropTypes.string,
};

export default Banner;
