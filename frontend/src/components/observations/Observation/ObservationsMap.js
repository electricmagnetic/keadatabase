import React, { Component } from 'react';
import { FeatureGroup, ScaleControl, Circle, CircleMarker, Popup } from 'react-leaflet';
import { GeoJSON as LeafletGeoJSON } from 'leaflet';
import PropTypes from 'prop-types';

import BaseMap from '../../map/BaseMap';
import { DEFAULT_BOUNDS } from '../../map/defaults';
import Observation from '../Observation';

import './ObservationsMap.scss';

/**
  Presents a nicely formatted map of given observations:
  - If `single` true, disables interactivity, popups and uses real precision for circle.
  - If `single` false, provides an interactive map with popups and a consistent circle size.
  */
class ObservationsMap extends Component {
  /**
    Uses a default set of bounds to initialise map.
    */
  constructor(props) {
    super(props);

    this.state = {
      featureBounds: DEFAULT_BOUNDS,
    };

    this.updateFeatureBounds = this.updateFeatureBounds.bind(this);
  }

  /**
    Updates featureBounds in state on a given event.
    */
  updateFeatureBounds(event) {
    this.setState({ featureBounds: event.target.getBounds() });
  }

  /**
    Generate CircleMarker and associated Tooltip for a given observation.
    */
  createCircleMarker = observation => (
    <CircleMarker
      center={LeafletGeoJSON.coordsToLatLng(observation.point_location.coordinates)}
      color="orange"
      key={observation.id}
      radius={10}
    >
      <Popup className="ObservationPopup" closeButton={false}>
        <Observation observation={observation} type="card" />
      </Popup>
    </CircleMarker>
  );

  /**
    Generate single Circle without Tooltip, better used for single observations
    */
  createCircle = observation => (
    <Circle
      center={LeafletGeoJSON.coordsToLatLng(observation.point_location.coordinates)}
      color="red"
      key={observation.id}
      radius={observation.precision}
    />
  );

  render() {
    const { observations, single } = this.props;

    const disableInteractivityProperties = {
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      touchZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      tap: false,
    };
    const boundsOptions = {
      maxZoom: 13,
    };

    return (
      <div className="ObservationsMap">
        <BaseMap
          boundsOptions={boundsOptions}
          bounds={this.state.featureBounds}
          {...(single && disableInteractivityProperties)}
        >
          <FeatureGroup onAdd={event => this.updateFeatureBounds(event)}>
            {single
              ? observations.map(observation => this.createCircle(observation))
              : observations.map(observation => this.createCircleMarker(observation))}
          </FeatureGroup>
          <ScaleControl />
        </BaseMap>
      </div>
    );
  }
}

ObservationsMap.propTypes = {
  observations: PropTypes.array.isRequired,
  single: PropTypes.bool.isRequired,
};

ObservationsMap.defaultProps = {
  single: false,
};

export default ObservationsMap;
