import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import GridTile from './GridTile';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/grid_tiles/`;

const Surveys = ({ queryString, ...others }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}${queryString}`, { dedupingInterval: 0 });

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error fetching grid tiles" />;
  } else if (data) {
    const gridTiles = data.results;

    return gridTiles.map(gridTile => (
      <GridTile gridTile={gridTile} key={gridTile.id} {...others} />
    ));
  } else return null;
};

GridTiles.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

GridTiles.defaultProps = {
  type: 'item',
  queryString: '',
};

export default GridTiles;
