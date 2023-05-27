import React from 'react';

import Error from '../../../helpers/Error';

/**
  Area for displaying error messages
 */
const Messages = ({ isValid, submitCount, errors }) => {
  const yupRejected = submitCount > 0 && errors && !isValid;

  if (yupRejected) window.scrollTo(0, 0);

  return (
    <div className="messages">
      {yupRejected > 0 && errors && !isValid && (
        <Error message="Invalid data">
          <p className="m-0">Invalid data provided. Please double-check the form for errors.</p>
        </Error>
      )}
    </div>
  );
};

export default Messages;
