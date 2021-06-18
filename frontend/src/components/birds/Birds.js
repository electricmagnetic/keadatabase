import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import Bird from './Bird';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/birds/`;

/**
  Birds fetches a series of birds using a given (optional) queryString and renders it using Bird.
  */
const Birds = ({ queryString, ...others }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}${queryString}`, { dedupingInterval: 0 });

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error fetching birds" />;
  } else if (data) {
    const birds = data.results;

    return birds.map(bird => <Bird bird={bird} key={bird.slug} {...others} />);
  } else return null;
};

Birds.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

Birds.defaultProps = {
  type: 'card',
  queryString: '',
};

export default Birds;
