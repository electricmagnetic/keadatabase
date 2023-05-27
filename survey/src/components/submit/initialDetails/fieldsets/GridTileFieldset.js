import React from 'react';

import { Field } from 'formik';

import RenderField from '../../../form/RenderField';

/**
  Fieldset for grid tile selection (wrapper around GridTilesSelectTypeahead).
 */
const GridTileFieldset = ({ values }) => (
  <fieldset className="mb-3">
    <legend>2. Trip Details</legend>
    <Field
      name="gridTiles"
      component={RenderField}
      values={values}
      type="gridTileSelect"
      multiple
      label="Surveyed grid tiles"
      helpText="Please select all surveyed grid tiles from the duration of your trip"
    />
    <p>
      <em>You can select grid tiles on the map below.</em>
    </p>
  </fieldset>
);

export default GridTileFieldset;
