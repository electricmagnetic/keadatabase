import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Observation from './Observation';
import BirdObservationBirdCard from './BirdObservation/BirdObservationBirdCard';
import BirdObservationFeature from './BirdObservation/BirdObservationFeature';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_PATH = `bird_observations`;

const RenderBirdObservation = ({ birdObservation, type, ...others }) => {
  if (!birdObservation) return <Error message="Invalid bird observation" />;

  switch (type) {
    case 'observationCard':
      return <Observation observation={birdObservation.sighting} type="card" {...others} />;
    case 'feature':
      return <BirdObservationFeature birdObservation={birdObservation} {...others} />;
    default:
      return <BirdObservationBirdCard birdObservation={birdObservation} {...others} />;
  }
};

/**
  BirdObservation either:
  - Renders a given bird observation as a specified type (e.g. card)
  - Fetches a bird observation using the given id and renders as a specified type
  */
const BirdObservation = ({ id, birdObservation, ...others }) => {
  const { isLoading, data, error } = useQuery([`${API_PATH}/${id}/`], { enabled: !!id });

  if (id) {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return <Error message="Error fetching birdObservation" />;
    } else if (data) {
      return <RenderBirdObservation birdObservation={data.results} {...others} />;
    } else return null;
  } else if (birdObservation) {
    return <RenderBirdObservation birdObservation={birdObservation} {...others} />;
  } else return null;
};

BirdObservation.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  birdObservation: PropTypes.object,
};

BirdObservation.defaultProps = {
  type: 'birdCard',
};

export default BirdObservation;
