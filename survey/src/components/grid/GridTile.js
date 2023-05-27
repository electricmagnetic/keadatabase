import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import GridTilePage from './GridTile/GridTilePage';
import GridTileItem from './GridTile/GridTileItem';
import GridTileCard from './GridTile/GridTileCard';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import tiles from '../../assets/geo/tiles.json';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/grid_tiles/`;

/**
  Selects component to render with, based on type
*/
const RenderGridTile = ({ gridTile, type, ...others }) => {
  if (!gridTile) return <Error message="Invalid grid tile" />;

  switch (type) {
    case 'card':
      return <GridTileCard gridTile={gridTile} {...others} />;
    case 'item':
      return <GridTileItem gridTile={gridTile} {...others} />;
    default:
      return <GridTilePage gridTile={gridTile} {...others} />;
  }
};

/**
  Displays a grid tile using a local source, a fetch or a provided object.
*/
const GridTile = ({ id, gridTile, api, ...others }) => {
  const { data, error, isValidating } = useSWR(api && id ? `${API_URL}${id}/` : null, {
    dedupingInterval: 0,
  });

  if (api) {
    if (isValidating) {
      return <Loader />;
    } else if (error) {
      return <Error message="Error fetching grid tiles" />;
    } else if (data) {
      return <RenderGridTile gridTile={data} {...others} />;
    } else return null;
  } else if (gridTile) {
    return <RenderGridTile gridTile={gridTile} {...others} />;
  } else if (id) {
    return <RenderGridTile gridTile={tiles.features.find(tile => tile.id === id)} {...others} />;
  } else return null;
};

GridTile.propTypes = {
  id: PropTypes.string,
  gridTile: PropTypes.object,
  type: PropTypes.string.isRequired,
  api: PropTypes.bool.isRequired,
};

GridTile.defaultProps = {
  type: 'item',
  api: false,
};

export default GridTile;
