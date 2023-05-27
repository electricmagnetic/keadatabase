import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GeoJSON as LeafletGeoJSON } from 'leaflet';
import { FeatureGroup, ScaleControl, Polygon, Tooltip } from 'react-leaflet';

import Error from '../helpers/Error';
import BaseMap from './BaseMap';
import { DEFAULT_BOUNDS } from '../map/defaults';

import './SelectedGridTilesMap.scss';
import tiles from '../../assets/geo/tiles.json';

/**
  Non-interactive map component for displaying a given set of grid tiles.
  Sets bounds of BaseMap component to whatever given by FeatureGroup (via updateGridBounds)
 */
class SelectedGridTilesMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridBounds: DEFAULT_BOUNDS,
    };

    this.getBounds = this.getBounds.bind(this);
    this.updateGridBounds = this.updateGridBounds.bind(this);
  }

  /**
    Obtain bounds of gridTiles (and neighbours) from either an event (onAdd/onRemove) or the featureGroup object
   */
  getBounds = event =>
    (event && event.target.getBounds()) ||
    (this.refs.featureGroup && this.refs.featureGroup.leafletElement.getBounds());

  /**
    Update the gridBounds in state. Designed for use with an event (e.g. from a FeatureGroup)
  */
  updateGridBounds(event) {
    const bounds = this.getBounds(event);
    if (bounds) this.setState({ gridBounds: bounds });
  }

  /**
    Updates the gridBounds in state. Designed for use when props change (e.g. without an event).
    Compares with toBBoxString as a direct comparison of two equivalent getBounds() does not evaluate as true..
   */
  componentDidUpdate(prevProps, prevState) {
    const bounds = this.getBounds();
    if (bounds && prevState.gridBounds.toBBoxString() !== bounds.toBBoxString())
      this.setState({ gridBounds: bounds });
  }

  /**
    Create a Polygon for each selected gridTileId. Retrieve coordinates from raw GeoJSON, then convert (due to differing conventions).
  */
  createSelectedGridTile = (gridTileId, isNeighbour = false) => (
    <Polygon
      positions={tiles.features
        .find(tile => tile.id === gridTileId)
        .geometry.coordinates.map(coordinate => LeafletGeoJSON.coordsToLatLngs(coordinate))}
      key={gridTileId}
      color="black"
      weight={isNeighbour ? 1 : 3}
      fillOpacity={isNeighbour ? 0.1 : 0.3}
      id={gridTileId}
      interactive={false}
    >
      <Tooltip
        direction="center"
        className={isNeighbour && 'neighbour'}
        permanent
        interactive={isNeighbour}
      >
        {isNeighbour ? <Link to={`/grid/${gridTileId}`}>{gridTileId}</Link> : gridTileId}
      </Tooltip>
    </Polygon>
  );

  /**
    Foo
   */
  getNeighbours = gridTileIds => [
    ...new Set(
      gridTileIds
        .map(
          gridTileId => tiles.features.find(tile => tile.id === gridTileId).properties.neighbours
        )
        .flat()
        .filter(neighbourId => !gridTileIds.includes(neighbourId))
    ),
  ];

  render() {
    const { gridTileIds, showNeighbours } = this.props;

    const disableInteractivity = {
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      tap: false,
    };
    const boundsOptions = {
      maxZoom: 12,
    };

    return (
      <div className="SelectedGridTilesMap">
        {gridTileIds.length > 0 ? (
          <BaseMap
            boundsOptions={boundsOptions}
            bounds={this.state.gridBounds}
            {...disableInteractivity}
            ref="map"
          >
            <FeatureGroup
              onAdd={event => this.updateGridBounds(event)}
              onRemove={event => this.updateGridBounds(event)}
              ref="featureGroup"
            >
              {gridTileIds.map(gridTileId => this.createSelectedGridTile(gridTileId))}
              {showNeighbours &&
                this.getNeighbours(gridTileIds).map(neighbourId =>
                  this.createSelectedGridTile(neighbourId, true)
                )}
            </FeatureGroup>
            <ScaleControl />
          </BaseMap>
        ) : (
          <Error message="No grid tiles found." />
        )}
      </div>
    );
  }
}

SelectedGridTilesMap.propTypes = {
  gridTileIds: PropTypes.array.isRequired,
  showNeighbours: PropTypes.bool.isRequired,
};

SelectedGridTilesMap.defaultProps = {
  showNeighbours: false,
};

export default SelectedGridTilesMap;
