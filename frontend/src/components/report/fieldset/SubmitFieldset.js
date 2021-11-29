import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../presentation/Page';

const SubmitFieldset = ({ submitCount, isValid, response, submissionPending }) => {
  const showInvalid = (submitCount > 0 && !isValid) || response.isError;

  return (
    <fieldset>
      <legend>5. Confirmation</legend>
      <Page id={185} hideTitle />

      <p>
        <button type="submit" className="btn btn-primary" disabled={submissionPending}>
          Submit
        </button>
        {submissionPending && <span className="mx-2">Submitting</span>}
      </p>

      {showInvalid && (
        <div className="alert alert-danger" role="alert">
          <div style={{ marginBottom: '1rem' }}>
            Hmm, it seems there were some errors. Please scroll up and check the data you've
            entered.
          </div>
          {response.isError && <small>{response.error.message}</small>}
        </div>
      )}
    </fieldset>
  );
};

SubmitFieldset.propTypes = {
  submitCount: PropTypes.number.isRequired,
  isValid: PropTypes.bool.isRequired,
  response: PropTypes.object.isRequired,
  submissionPending: PropTypes.bool.isRequired,
};

export default SubmitFieldset;
