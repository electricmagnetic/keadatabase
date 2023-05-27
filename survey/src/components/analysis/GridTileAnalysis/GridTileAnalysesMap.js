import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ScaleControl, Popup, Polygon } from 'react-leaflet';
import { GeoJSON as LeafletGeoJSON } from 'leaflet';

import BaseMap from '../../map/BaseMap';

import tiles from '../../../assets/geo/tiles.json';
import '../../map/GridTileMap.scss';

/**
  Map component for analysis of tiles.
 */
class GridTileAnalysisMap extends Component {
  /**
    Generate colouring based on hours with/without kea.
   */
  analysisTileStyle = gridTileAnalysis => {
    const hasKea = gridTileAnalysis.hours_total.with_kea > 0;
    const manyHours = gridTileAnalysis.hours_total.total > 10;

    const colour = hasKea ? '#df5206' : '#111111';

    const fillOpacity = hasKea
      ? 0.3 + (gridTileAnalysis.hours_total.with_kea / gridTileAnalysis.hours_total.total) * 0.4
      : manyHours
      ? 0.7
      : 0.3;

    return {
      color: colour,
      weight: 1,
      opacity: 0.6,
      fillOpacity: fillOpacity,
    };
  };

  /**
    Create a Polygon for each gridTileAnalysis. Retrieve coordinates from raw GeoJSON, then convert (due to differing conventions).
  */
  createGridTile = gridTileAnalysis => (
    <Polygon
      positions={tiles.features
        .find(tile => tile.id === gridTileAnalysis.id)
        .geometry.coordinates.map(coordinate => LeafletGeoJSON.coordsToLatLngs(coordinate))}
      key={gridTileAnalysis.id}
      id={gridTileAnalysis.id}
      {...this.analysisTileStyle(gridTileAnalysis)}
    >
      <Popup direction="center" className="tile-popup" closeButton={false}>
        <h2>{gridTileAnalysis.id}</h2>
        <dl className="form-row mb-2">
          <dt className="col-8">Total</dt>
          <dd className="col-4">{gridTileAnalysis.hours_total.total}</dd>
          <dt className="col-8">w/ kea</dt>
          <dd className="col-4">{gridTileAnalysis.hours_total.with_kea}</dd>
        </dl>
        <Link to={`/grid/${gridTileAnalysis.id}`}>View</Link>
      </Popup>
    </Polygon>
  );

  render() {
    const { gridTileAnalyses } = this.props;

    return (
      <div className="GridTileMap">
        <BaseMap hideGridTiles>
          {gridTileAnalyses.map(gridTileAnalysis => this.createGridTile(gridTileAnalysis))}
          <ScaleControl />
        </BaseMap>
      </div>
    );
  }
}

GridTileAnalysisMap.propTypes = {
  gridTileAnalyses: PropTypes.array.isRequired,
};

export default GridTileAnalysisMap;
