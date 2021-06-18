import React from 'react';
import { Helmet } from 'react-helmet';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

const HelpPage = props => {
  return (
    <div className="HelpPage">
      <Helmet title="About" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Help</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <Page id={286} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
