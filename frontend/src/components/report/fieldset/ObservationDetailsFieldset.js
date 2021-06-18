import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import MapSelector from '../../helpers/MapSelector';
import { RenderField } from '../../helpers/RenderField';

const ObservationDetailsFieldset = ({ options, values, setFieldValue }) => {
  return (
    <fieldset>
      <legend>1. Observation Details</legend>

      <div className="form-group">
        <div className="row">
          <div className="col-md-4">
            <Field
              component={RenderField}
              options={options.date_sighted}
              name="date_sighted"
              type="date"
              label="Date"
            />
          </div>
          <div className="col-md-4">
            <Field
              component={RenderField}
              options={options.time_sighted}
              name="time_sighted"
              type="time"
              label="Time"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Location</div>

        <div className="card-body">
          <p>Click/tap on the map to set a point, or alternatively enter the coordinates below.</p>

          <div className="map-container mb-3">
            <MapSelector options={options} values={values} setFieldValue={setFieldValue} />
          </div>

          <p>
            Use the precision dropdown to give us an indication of how accurate the location is (in
            metres).
          </p>

          <div className="row">
            <div className="col-md-6 col-lg-4">
              <Field
                component={RenderField}
                options={options.precision}
                name="precision"
                type="choice"
              />
            </div>

            <div className="offset-lg-2 col-md-3">
              <Field
                component={RenderField}
                options={options.point_location}
                name="longitude"
                label="Longitude"
                placeholder="e.g. 171.562"
              />
            </div>

            <div className="col-md-3">
              <Field
                component={RenderField}
                options={options.point_location}
                name="latitude"
                label="Latitude"
                placeholder="e.g. -42.940"
              />
            </div>
          </div>

          <Field
            component={RenderField}
            options={options.location_details}
            name="location_details"
            type="textarea"
            label="Location details (optional)"
            placeholder="e.g. Beside the Arthur's Pass Store"
          />
        </div>
      </div>
    </fieldset>
  );
};

ObservationDetailsFieldset.propTypes = {
  options: PropTypes.shape({
    precision: PropTypes.shape({
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number.isRequired,
          display_name: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default ObservationDetailsFieldset;
