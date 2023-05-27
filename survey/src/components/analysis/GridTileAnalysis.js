import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import GridTileAnalysisItem from './GridTileAnalysis/GridTileAnalysisItem';

const API_URL = `${process.env.REACT_APP_API_BASE}/analysis/grid_tiles/`;

/**
  FOO
*/
const RenderGridTileAnalysis = ({ gridTileAnalysis, type, ...others }) => {
  if (!gridTileAnalysis) return <Error message="Invalid grid tile analysis" />;

  switch (type) {
    default:
      return <GridTileAnalysisItem gridTileAnalysis={gridTileAnalysis} {...others} />;
  }
};

/**
  Obtain analyses for a given grid tile (object) or ID (via API)
 */
const GridTileAnalysis = ({ id, gridTileAnalysis, ...others }) => {
  const { data, error, isValidating } = useSWR(id ? `${API_URL}${id}/` : null, {
    dedupingInterval: 0,
  });

  if (id) {
    if (isValidating) {
      return <Loader />;
    } else if (error) {
      return error.status === 404 ? (
        <Error message="No analysis found" info />
      ) : (
        <Error message="Error fetching grid tile analysis" />
      );
    } else if (data) {
      return <RenderGridTileAnalysis gridTileAnalysis={data} {...others} />;
    } else return null;
  } else if (gridTileAnalysis) {
    return <RenderGridTileAnalysis gridTileAnalysis={gridTileAnalysis} {...others} />;
  } else return null;
};

GridTileAnalysis.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  gridTileAnalysis: PropTypes.object,
};

GridTileAnalysis.defaultProps = {
  type: 'item',
};

export default GridTileAnalysis;
