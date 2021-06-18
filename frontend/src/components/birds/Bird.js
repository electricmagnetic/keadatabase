import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import BirdPage from './Bird/BirdPage';
import BirdCard from './Bird/BirdCard';
import BirdFeature from './Bird/BirdFeature';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/birds/`;

/**
  Selects component to render with, based on type
*/
const RenderBird = ({ bird, type, ...others }) => {
  if (!bird) return <Error message="Invalid grid tile" />;

  switch (type) {
    case 'feature':
      return <BirdFeature bird={bird} {...others} />;
    case 'card':
      return <BirdCard bird={bird} {...others} />;
    default:
      return <BirdPage bird={bird} {...others} />;
  }
};

/**
  Bird either:
  - Renders a given bird as a specified type (e.g. card, page)
  - Fetches a bird using the given id and renders as a specified type
  */
const Bird = ({ id, bird, ...others }) => {
  const { data, error, isValidating } = useSWR(id ? `${API_URL}${id}/` : null, {
    dedupingInterval: 0,
  });

  if (id) {
    if (isValidating) {
      return <Loader />;
    } else if (error) {
      return <Error message="Error fetching bird" />;
    } else if (data) {
      return <RenderBird bird={data} {...others} />;
    } else return null;
  } else if (bird) {
    return <RenderBird bird={bird} {...others} />;
  } else return null;
};

Bird.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  bird: PropTypes.object,
};

Bird.defaultProps = {
  type: 'page',
};

export default Bird;
