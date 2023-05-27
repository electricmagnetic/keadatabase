import React from 'react';
import { Field } from 'formik';

import RenderField from '../../../form/RenderField';

/**
  Fieldset for the two observer fields.
 */
const ObserverFieldset = ({ values, setFieldValue }) => (
  <fieldset className="mb-3">
    <legend>1. Observer Details</legend>
    <div className="row">
      <div className="col-md-5">
        <Field
          component={RenderField}
          name="observer.name"
          type="text"
          placeholder="Name"
          label="Name"
          helpText="Your name will be publicly visible"
          autoFocus
        />
      </div>
      <div className="col-md-7">
        <Field
          component={RenderField}
          name="observer.email"
          type="text"
          placeholder="Email"
          label="Email"
          helpText="Your email is only visible to the project team"
        />
      </div>
    </div>
  </fieldset>
);

export default ObserverFieldset;
