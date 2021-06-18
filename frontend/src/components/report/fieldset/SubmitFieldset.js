import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../presentation/Page';

const SubmitFieldset = ({ submitCount, isValid, isSubmitting, response }) => {
  const showInvalid = (submitCount > 0 && !isValid) || response.rejected;
  return (
    <fieldset>
      <legend>5. Confirmation</legend>
      <Page id={185} hideTitle />

      <p>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          Submit
        </button>
      </p>

      {showInvalid && (
        <div className="alert alert-danger" role="alert">
          <div style={{ marginBottom: '1rem' }}>
            Hmm, it seems there were some errors. Please scroll up and check the data you've
            entered.
          </div>
          {response.rejected && <small>{response.value.message}</small>}
        </div>
      )}
    </fieldset>
  );
};

SubmitFieldset.propTypes = {
  submitCount: PropTypes.number.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    rejected: PropTypes.bool.isRequired,
    value: PropTypes.object.isRequired,
  }).isRequired,
};

export default SubmitFieldset;
