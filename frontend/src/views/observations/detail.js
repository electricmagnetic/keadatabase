import React from 'react';

import Observation from '../../components/observations/Observation';

const ObservationDetailPage = ({ match }) => {
  const id = match.params.id;

  return (
    <div className="ObservationDetailPage">
      <Observation id={id} type="page" />
    </div>
  );
};

export default ObservationDetailPage;
