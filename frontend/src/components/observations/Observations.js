import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import Observation from './Observation';
import ObservationsMap from './Observation/ObservationsMap';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/observations/`;

/**
  Observations fetches a series of observations using a given (optional) queryString and renders it using Observation.
  */
const Observations = props => {
  const { queryString, ...others } = props;
  const { data, error, isValidating } = useSWR(`${API_URL}${queryString}`, { dedupingInterval: 0 });

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error />;
  } else if (data) {
    const observations = data.results;

    // Intercept type 'map', as this needs rendering as a group on a single map
    if (props.type === 'map') return <ObservationsMap observations={observations} {...others} />;
    else
      return observations.map(observation => (
        <Observation observation={observation} key={observation.id} {...others} />
      ));
  } else return null;
};

Observations.propTypes = {
  queryString: PropTypes.string,
};

Observations.defaultProps = {
  queryString: '',
};

export default Observations;
