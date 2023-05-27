import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

const InstructionsPage = props => {
  return (
    <div className="InstructionsPage">
      <Helmet title="Instructions" />
      <section className="mb-5">
        <Banner size="small">
          <h1>How To Survey</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Page id={478} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default InstructionsPage;
