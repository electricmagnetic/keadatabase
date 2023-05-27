import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet';

import { DEFAULT_ZOOM, DEFAULT_BOUNDS } from './defaults';

import { outlineStyle } from './style';
import './BaseMap.scss';

import tilesOutline from '../../assets/geo/tilesOutline';

class BaseMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        center: DEFAULT_BOUNDS.getCenter(),
        zoom: DEFAULT_ZOOM,
      },
    };
  }

  render() {
    const { children, hideGridTiles } = this.props;

    return (
      <LeafletMap
        className="map"
        viewport={this.state.viewport}
        minZoom={7}
        maxZoom={14}
        {...this.props}
      >
        <TileLayer
          attribution="Mapbox"
          url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`}
        />
        <TileLayer
          url={`https://tiles-{s}.data-cdn.linz.govt.nz/services;key=${process.env.REACT_APP_LINZ_API_KEY}/tiles/v4/layer=50798/EPSG:3857/{z}/{x}/{y}.png`}
          minZoom={10}
          maxZoom={12}
          subdomains={'abcd'}
        />
        <TileLayer
          url={`https://tiles-{s}.data-cdn.linz.govt.nz/services;key=${process.env.REACT_APP_LINZ_API_KEY}/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png`}
          attribution="LINZ, licensed for reuse (CC BY 4.0)."
          minZoom={12}
          subdomains={'abcd'}
        />
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name="Grid Tiles" checked={!hideGridTiles}>
            <TileLayer url={`https://geo.keadatabase.nz/grid/layer/{z}/{x}/{y}.png`} />
          </LayersControl.Overlay>
        </LayersControl>

        <GeoJSON data={tilesOutline} style={outlineStyle} />
        {children}
      </LeafletMap>
    );
  }
}

BaseMap.defaultProps = {
  hideGridTiles: false,
};

export default BaseMap;
