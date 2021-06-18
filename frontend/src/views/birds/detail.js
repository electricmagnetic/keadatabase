import React from 'react';

import Bird from '../../components/birds/Bird';

const BirdDetailPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="BirdDetailPage">
      <Bird id={slug} type="page" />
    </div>
  );
};

export default BirdDetailPage;
