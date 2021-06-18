import React, { Component } from 'react';
import { Circle } from 'react-leaflet';
import { latLng } from 'leaflet';

import BaseMap from '../map/BaseMap';
import { DEFAULT_BOUNDS, POINT_ZOOM } from '../map/defaults';

import './MapSelector.scss';

/**
  Enables the selection of longitude and latitude via a map interface.
  Data managed via formik (props.values, props.setFieldValue).
  Verifies that coordinates entered at valid before trying to render them:
  map only renders coordinates that fall within the bounds of New Zealand.
  Radius specified by the form field 'precision'.
 */
class MapSelector extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    this.props.setFieldValue('longitude', event.latlng.lng.toFixed(6));
    this.props.setFieldValue('latitude', event.latlng.lat.toFixed(6));
  };

  render() {
    const { latitude, longitude } = this.props.values;
    const pointSpecified = !isNaN(latitude) && !isNaN(longitude);
    const latlng =
      pointSpecified && latLng(this.props.values.latitude, this.props.values.longitude);
    const isWithinBounds = latlng && DEFAULT_BOUNDS.contains(latlng);

    return (
      <div className="MapSelector">
        <BaseMap
          center={isWithinBounds && latlng}
          length={4}
          onClick={this.handleClick}
          zoom={isWithinBounds && POINT_ZOOM}
        >
          {isWithinBounds && (
            <Circle center={latlng} radius={parseInt(this.props.values.precision)} color="orange" />
          )}
        </BaseMap>
      </div>
    );
  }
}

export default MapSelector;
