import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { RenderField } from '../../helpers/RenderField';

const FurtherInformationFieldset = ({ options }) => {
  return (
    <fieldset>
      <legend>4. Comments (optional)</legend>

      <Field
        component={RenderField}
        options={options.comments}
        name="comments"
        type="textarea"
        placeholder="Any comments?"
      />

      <div className="form-check">
        <Field
          type="checkbox"
          name="contributor.communications"
          className="form-check-input"
          id="contributor-communications"
        />
        <label className="form-check-label" htmlFor="contributor-communications">
          I would like to hear more from the Arthur's Pass Kea Team.
        </label>
      </div>
    </fieldset>
  );
};

FurtherInformationFieldset.propTypes = {
  options: PropTypes.object.isRequired,
};

export default FurtherInformationFieldset;
