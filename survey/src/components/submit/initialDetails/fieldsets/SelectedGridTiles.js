import React from 'react';
import PropTypes from 'prop-types';

import Error from '../../../helpers/Error';
import GridTile from '../../../grid/GridTile';

/**
  Displays a given set of gridTile IDs as a grid (without additional details).
 */
const SelectedGridTiles = ({ values }) => {
  const { gridTiles } = values;
  if (gridTiles.length > 0) {
    return (
      <div className="SelectedGridTiles card bg-faded mx-3 mb-3">
        <div className="card-body my-n3">
          <div className="form-row">
            {gridTiles.map(gridTileId => (
              <div className="col-6 col-xl-4" key={gridTileId}>
                <GridTile id={gridTileId} hideDetails type="card" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <Error message="No grid tile(s) selected" info />;
  }
};

SelectedGridTiles.propTypes = {
  values: PropTypes.object.isRequired,
};

export default SelectedGridTiles;
