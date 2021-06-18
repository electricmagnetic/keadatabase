import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { RenderField } from '../../helpers/RenderField';

const FurtherInformationFieldset = ({ options }) => {
  return (
    <fieldset>
      <legend>4. Further Information (Optional)</legend>
      <p>
        <em>All of these fields are optional</em>
      </p>

      <Field
        component={RenderField}
        options={options.comments}
        name="comments"
        type="textarea"
        placeholder="Any comments?"
      />

      <div className="row">
        <div className="col-md-4">
          <Field
            component={RenderField}
            options={options.contributor.children.activity}
            name="contributor.activity"
            type="choice"
            label="I'm a..."
          />
        </div>

        <div className="col-md-4">
          <Field
            component={RenderField}
            options={options.contributor.children.heard}
            name="contributor.heard"
            type="choice"
            label="How did you hear about this?"
          />
        </div>

        <div className="col-md-4">
          <Field
            component={RenderField}
            options={options.contributor.children.phone}
            name="contributor.phone"
            type="text"
            placeholder="Phone number"
          />
        </div>
      </div>

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
