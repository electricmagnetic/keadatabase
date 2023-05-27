import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import GridTileAnalysis from './GridTileAnalysis';
import GridTileAnalysesMap from './GridTileAnalysis/GridTileAnalysesMap';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/analysis/grid_tiles/`;

/**
  GridTileAnalyses fetches a series of gridTileAnalyses using a given (optional) queryString and renders it using GridTileAnalysis.
  */
const GridTileAnalyses = ({ queryString, type, ...others }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}${queryString}`, { dedupingInterval: 0 });

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error fetching gridTileAnalyses" />;
  } else if (data) {
    const gridTileAnalyses = data;

    // Intercept type 'map', as this needs rendering as a group on a single map
    if (type === 'map')
      return <GridTileAnalysesMap gridTileAnalyses={gridTileAnalyses} {...others} />;
    else
      return gridTileAnalyses.map(gridTileAnalysis => (
        <GridTileAnalysis
          gridTileAnalysis={gridTileAnalysis}
          key={gridTileAnalysis.id}
          {...others}
        />
      ));
  } else return null;
};

GridTileAnalyses.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

GridTileAnalyses.defaultProps = {
  type: 'item',
  queryString: '',
};

export default GridTileAnalyses;
