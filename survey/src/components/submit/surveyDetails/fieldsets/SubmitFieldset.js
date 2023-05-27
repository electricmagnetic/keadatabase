import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../../helpers/Loader';

const SubmitFieldset = ({ isValid, isSubmitting, postSubmissionResponse }) => {
  const isLoading =
    (postSubmissionResponse && postSubmissionResponse.pending) ||
    (postSubmissionResponse && postSubmissionResponse.refreshing) ||
    isSubmitting;
  const isRejected = postSubmissionResponse && postSubmissionResponse.rejected;
  const isFulfilled = postSubmissionResponse && postSubmissionResponse.fulfilled;

  return (
    <fieldset>
      <legend className="sr-only">Submission</legend>
      <div className="row align-items-center">
        <div className="col-8">
          {!isValid && (
            <small className="d-inline-block">Form can be submitted once data entered.</small>
          )}
          {isRejected && <span>Error</span>}
          {isLoading && <Loader />}
          {isFulfilled && <span>Success</span>}
        </div>
        <div className="col-4 text-right">
          <button type="submit" className="btn btn-primary mr-3" disabled={isLoading || !isValid}>
            Submit
          </button>
        </div>
      </div>
    </fieldset>
  );
};

SubmitFieldset.propTypes = {
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  postSubmissionResponse: PropTypes.shape({
    fulfilled: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    reason: PropTypes.object,
    refreshing: PropTypes.bool.isRequired,
    rejected: PropTypes.bool.isRequired,
    settled: PropTypes.bool.isRequired,
  }),
};

export default SubmitFieldset;
