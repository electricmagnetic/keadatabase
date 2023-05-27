import React from 'react';

/**
  Submission fieldset, modelled off the main form submission SubmitFieldset, except without API interaction.
 */
const SubmitFieldset = ({ isValid }) => (
  <fieldset>
    <legend className="sr-only">Submission</legend>
    <div className="row align-items-center">
      <div className="col-8">
        {!isValid && (
          <small className="d-inline-block">Form can be submitted once data entered.</small>
        )}
      </div>
      <div className="col-4 text-right">
        <input type="submit" value="Next" className="btn btn-primary" disabled={!isValid} />
      </div>
    </div>
  </fieldset>
);

export default SubmitFieldset;
