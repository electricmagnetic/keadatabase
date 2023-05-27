import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './GridTileCard.scss';

/**
  Presents a nicely formatted card for a given grid tile.
 */
const GridTileCard = ({ gridTile, hideDetails, hideImage, addLink, ...others }) => {
  /* GeoJSON has tile data in properties, regular API endpoint does not */
  const tileData = gridTile.properties || gridTile;
  const id = others.id || gridTile.id;

  const classNames = ['GridTileCard', 'card', 'my-3', hideDetails && 'hideDetails'];

  return (
    <div className={classNames.join(' ')}>
      {!hideImage && (
        <img src={tileData.get_large_image} alt="Map grid tile" className="card-img-top" />
      )}
      <div className="card-body">
        <h2 className="card-title">
          <i className="fa-fw fas fa-map-marker-alt mr-1"></i>
          {addLink ? <Link to={`/grid/${id}`}>{id}</Link> : id}
        </h2>
        {!hideDetails && (
          <div className="card-text">
            <dl className="m-0">
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
        )}
      </div>
    </div>
  );
};

GridTileCard.propTypes = {
  gridTile: PropTypes.object.isRequired,
  hideDetails: PropTypes.bool.isRequired,
  hideImage: PropTypes.bool.isRequired,
  addLink: PropTypes.bool.isRequired,
};

GridTileCard.defaultProps = {
  hideDetails: false,
  hideImage: false,
  addLink: false,
};

export default GridTileCard;
