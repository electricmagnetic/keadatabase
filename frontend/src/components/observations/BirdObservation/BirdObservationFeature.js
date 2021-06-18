import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormatDateTime from '../../helpers/FormatDateTime';
import getPicture from '../../birds/Bird/helpers/getPicture';
import birdLink from '../../birds/Bird/helpers/birdLink';

/**
  Presents a 'feature' (rounded image with details) containing information about a recently sighted
  Bird and the relevant sighting.
  */
const BirdObservationFeature = ({ birdObservation, ...others }) => {
  const { className } = others;
  const classNames = ['BirdObservationFeature'];
  if (className) classNames.push(className);

  const { bird, sighting } = birdObservation;

  return (
    <div className={classNames.join(' ')}>
      <div className="card border-0">
        <Link to={birdLink(bird)}>
          <img
            src={getPicture(bird, 'large')}
            alt={bird.name}
            className="card-img-top rounded-circle"
          />
        </Link>
        <div className="card-body px-0 py-2 text-center">
          <h3 className="card-title h5 mt-0 mb-1">
            <Link to={birdLink(bird)}>{bird.name}</Link>
          </h3>
          <FormatDateTime calendar>
            {sighting.date_sighted} {sighting.time_sighted}
          </FormatDateTime>
        </div>
      </div>
    </div>
  );
};

BirdObservationFeature.propTypes = {
  birdObservation: PropTypes.object.isRequired,
};

export default BirdObservationFeature;
