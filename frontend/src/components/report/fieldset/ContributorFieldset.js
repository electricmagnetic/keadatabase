import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { RenderField } from '../../helpers/RenderField';

const ContributorFieldset = ({ options }) => {
  return (
    <fieldset>
      <legend>3. About You</legend>

      <p>We need to know who is reporting the observation.</p>

      <div className="row">
        <div className="col-md-6">
          <Field
            component={RenderField}
            options={options.contributor.children.name}
            name="contributor.name"
            type="text"
            placeholder="Name"
          />

          <Field
            component={RenderField}
            options={options.contributor.children.email}
            name="contributor.email"
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="col-md-5 offset-md-1">
          <p className="text-muted">
            Your name will be public (as part of your observation), but any contact information you
            provide will not be.
          </p>
        </div>
      </div>
    </fieldset>
  );
};

ContributorFieldset.propTypes = {
  options: PropTypes.object.isRequired,
};

export default ContributorFieldset;
