import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import generateSummary from './helpers/generateSummary';
import getPicture from './helpers/getPicture';
import birdLink from './helpers/birdLink';
import PrettyBandCombo from './helpers/PrettyBandCombo';

import './BirdCard.scss';

/**
  Presents a nicely formatted card for a given bird.
 */
const BirdCard = ({ bird, ...others }) => {
  const { className } = others;
  const classNames = ['BirdCard'];
  if (className) classNames.push(className);

  return (
    <div className={classNames.join(' ')}>
      <div className="card card-dull">
        <Link to={birdLink(bird)}>
          <img
            src={getPicture(bird)}
            alt={bird.name}
            className={`card-img-top ${bird.status === 'Dead' && 'isDead'}`}
          />
        </Link>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h2 className="card-title mx-0 my-1">
              <Link to={birdLink(bird)}>{bird.name}</Link>
            </h2>
          </li>
          <li className="list-group-item">{generateSummary(bird)}</li>
          <li className="list-group-item">
            <PrettyBandCombo bandCombo={bird.band_combo} />
          </li>
          <li className="list-group-item">
            <i className="far fa-fw fa-circle mr-2" />
            {bird.band_combo}
          </li>
          <li className="list-group-item">
            <i className="fa-fw fas fa-map-marker-alt mr-2" />
            {bird.study_area}
          </li>
        </ul>
      </div>
    </div>
  );
};

BirdCard.propTypes = {
  bird: PropTypes.object.isRequired,
};

export default BirdCard;
