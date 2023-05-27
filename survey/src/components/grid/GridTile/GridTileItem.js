import React from 'react';
import PropTypes from 'prop-types';

/**
  Presents a nicely formatted list item for a given grid tile.
 */
const GridTileItem = ({ gridTile, ...others }) => {
  /* GeoJSON has tile data in properties, regular API endpoint does not */
  const tileData = gridTile.properties || gridTile;
  const id = others.id || gridTile.id;

  return (
    <div className="GridTileItem card mb-1">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <img src={tileData.get_large_image} alt="Map grid tile" className="img-fluid" />
          </div>
          <div className="col-md-9">
            <h2 className="card-title">{id}</h2>
            <div className="card-text">
              <dl>
                <div className="row">
                  <div className="col-6">
                    <dt>
                      SW <small>NZTM</small>
                    </dt>
                    <dd>
                      {tileData.min.coordinates[0]}, {tileData.min.coordinates[1]}
                    </dd>
                  </div>
                  <div className="col-6">
                    <dt>
                      NE <small>NZTM</small>
                    </dt>
                    <dd>
                      {tileData.max.coordinates[0]}, {tileData.max.coordinates[1]}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GridTileItem.propTypes = {
  gridTile: PropTypes.object.isRequired,
};

export default GridTileItem;
