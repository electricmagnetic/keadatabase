import React from 'react';
import PropTypes from 'prop-types';

import Error from '../../../helpers/Error';

const Messages = ({ isValid, submitCount, errors, postSubmissionResponse }) => {
  const apiRejected = postSubmissionResponse && postSubmissionResponse.rejected;
  const yupRejected = submitCount > 0 && errors && !isValid;

  if (apiRejected || yupRejected) window.scrollTo(0, 0);

  return (
    <div className="messages">
      {apiRejected && (
        <Error message="Submission error">
          <p className="m-0">
            An error was encountered when submitting the data. Please double-check the form for
            errors and try again.
            <br />
            If this error persists please contact us.
          </p>
          {postSubmissionResponse.reason.cause && `(${postSubmissionResponse.reason.cause.detail})`}
          {postSubmissionResponse.reason.message && `(${postSubmissionResponse.reason.message})`}
        </Error>
      )}
      {yupRejected && (
        <Error message="Invalid data">
          <p className="m-0">Invalid data provided. Please double-check the form for errors.</p>
        </Error>
      )}
    </div>
  );
};

Messages.propTypes = {
  postSubmissionResponse: PropTypes.shape({
    reason: PropTypes.object,
    rejected: PropTypes.bool.isRequired,
  }),
};

export default Messages;
