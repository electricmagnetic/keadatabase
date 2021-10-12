import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Bird from './Bird';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_PATH = `birds`;

/**
  Birds fetches a series of birds using a given (optional) queryString and renders it using Bird.
  */
const Birds = ({ queryString, ...others }) => {
  const { isLoading, data, error } = useQuery([`${API_PATH}/${queryString}`]);

  if (isLoading || !data) {
    return <Loader />;
  } else if (error) {
    return <Error />;
  } else if (data) {
    const birds = data.results.results;

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
