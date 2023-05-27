import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import RenderField from '../../../form/RenderField';

const atLeastOneKeaObserved = values =>
  values.hours.reduce((accumulator, current) => accumulator || current.kea, false);

const FurtherInformationFieldset = ({ fieldOptions, values }) => (
  <fieldset className="mb-3">
    <legend>3. Further Information</legend>
    <div className="row">
      <div className="col-md-4">
        {values.hours.length > 0 && atLeastOneKeaObserved(values) && (
          <Field
            component={RenderField}
            fieldOptions={fieldOptions.max_flock_size}
            name="max_flock_size"
            type="number"
            label="Max kea seen"
          />
        )}
      </div>
    </div>

    <Field
      component={RenderField}
      fieldOptions={fieldOptions.comments}
      name="comments"
      type="textarea"
      placeholder="Any comments? (optional)"
    />
  </fieldset>
);

FurtherInformationFieldset.propTypes = {
  fieldOptions: PropTypes.object.isRequired,
};

export default FurtherInformationFieldset;
