import React from 'react';
import PropTypes from 'prop-types';

import GridTileTypeahead from '../grid/GridTileTypeahead';

/**
  Field component for grid tile selection. Using react-bootstrap-typeahead.
  Builds on GridTileTypeahead to add functions necessary for use with Formik.
 */
const GridTileSelectTypeahead = ({ name, form, ...field }) => {
  return (
    <GridTileTypeahead
      {...field}
      onChange={selected => form.setFieldValue(name, selected)}
      onBlur={event => form.setFieldTouched(name, true)}
      selected={form.values[name]}
    />
  );
};

GridTileSelectTypeahead.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
};

export default GridTileSelectTypeahead;
