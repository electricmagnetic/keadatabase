import React from 'react';
import { Helmet } from 'react-helmet';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

const SponsorPage = props => {
  return (
    <div className="SponsorPage">
      <Helmet title="Sponsor A Kea" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Sponsor A Kea</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <Page id={221} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default SponsorPage;
