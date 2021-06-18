import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TruncateMarkup from 'react-truncate-markup';

import getPicture from './helpers/getPicture';
import birdLink from './helpers/birdLink';

/**
  Presents a nicely formatted feature for a given bird.
 */
const BirdFeature = ({ bird, ...others }) => {
  const { className } = others;
  const classNames = ['BirdFeature'];
  if (className) classNames.push(className);

  return (
    <div className={classNames.join(' ')}>
      <div className="card border-0 bg-transparent text-white">
        <div className="card-body text-center">
          <Link to={birdLink(bird)} className="text-white">
            <h3 className="card-title h3 m-0">{bird.name}</h3>
            <img
              src={getPicture(bird, 'large')}
              alt={bird.name}
              className="img-fluid rounded-circle my-3"
            />
          </Link>
          <TruncateMarkup lines={4}>
            <p>{bird.bird_extended.description}</p>
          </TruncateMarkup>
          <Link to={birdLink(bird)} role="button" className="btn btn-outline-light">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

BirdFeature.propTypes = {
  bird: PropTypes.object.isRequired,
};

export default BirdFeature;
