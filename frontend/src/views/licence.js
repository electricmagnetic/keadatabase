import React from 'react';
import { Helmet } from 'react-helmet';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

const LicencePage = props => {
  return (
    <div className="LicencePage">
      <Helmet title="Licence/Copyright" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Licence &amp; Copyright</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <Page id={53} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default LicencePage;
