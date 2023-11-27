import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import proj4 from "proj4";

import epsg2193 from "../../map/epsg2193";
import MapSelector from "../../helpers/MapSelector";
import { RenderField } from "../../helpers/RenderField";

/** One-way converter from NZTM (NZGD2000) to WGS84 */
const CoordinateConverter = ({ setFieldValue }) => {
  const [easting, setEasting] = useState("");
  const [northing, setNorthing] = useState("");

  const gridToCoordinates = (grid) =>
    grid[0] && grid[1]
      ? proj4(
          epsg2193,
          "EPSG:4326",
          grid.map((value) => parseFloat(value)),
        )
      : ["", ""];

  return (
    <>
      {/* <button className="btn btn-link btn-sm btn-block" type="button" data-toggle="collapse" data-target="#converter" aria-expanded="false" aria-controls="converter">
      
    </button> */}
      <div className="accordion" id="converterContainer">
        <div className="card card-dull">
          <div className="card-header p-0" id="converterHeading">
            <button
              className="btn btn-link btn-block"
              type="button"
              data-toggle="collapse"
              data-target="#converter"
              aria-expanded="true"
              aria-controls="converter"
            >
              Convert Map Ref <i className="fas fa-caret-down ml-2"></i>
            </button>
          </div>
          <div
            id="converter"
            className="collapse"
            aria-labelledby="converterHeading"
            data-parent="#converterContainer"
          >
            <div className="card-body p-2">
              <div className="form-row">
                <div className="col-lg-6">
                  <label htmlFor="easting" className="sr-only">
                    Easting
                  </label>
                  <div className="input-group input-group-sm">
                    <input
                      id="easting"
                      name="easting"
                      className="form-control"
                      type="number"
                      value={easting}
                      onChange={(event) => setEasting(event.target.value)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text text-monospace">E</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="northing" className="sr-only">
                    Northing
                  </label>
                  <div className="input-group input-group-sm mb-2">
                    <input
                      id="northing"
                      name="northing"
                      className="form-control"
                      type="number"
                      value={northing}
                      onChange={(event) => setNorthing(event.target.value)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text text-monospace">N</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm btn-block"
                    onClick={(event) => {
                      event.preventDefault();
                      const [longitude, latitude] = gridToCoordinates([
                        easting,
                        northing,
                      ]);
                      setFieldValue("latitude", latitude.toFixed(6));
                      setFieldValue("longitude", longitude.toFixed(6));
                    }}
                  >
                    Convert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ObservationDetailsFieldset = ({ options, values, setFieldValue }) => {
  return (
    <fieldset>
      <legend>2. Observation Details</legend>

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
          <p>
            Click/tap on the map to set a point, or alternatively enter the
            coordinates below.
          </p>

          <div className="map-container mb-3">
            <MapSelector
              options={options}
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>

          <p>
            Use the precision dropdown to give us an indication of how accurate
            the location is (in metres).
          </p>

          <div className="form-row">
            <div className="col-md-8">
              <div className="form-row">
                <div className="col-md-4">
                  <Field
                    component={RenderField}
                    options={options.precision}
                    name="precision"
                    type="choice"
                  />
                </div>
                <div className="col-md-4">
                  <Field
                    component={RenderField}
                    options={options.point_location}
                    name="longitude"
                    label="Longitude"
                    placeholder="e.g. 171.562"
                  />
                </div>
                <div className="col-md-4">
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
            <div className="offset-md-1 col-md-3">
              <CoordinateConverter
                values={values}
                setFieldValue={setFieldValue}
              />
            </div>
          </div>
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
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default ObservationDetailsFieldset;
