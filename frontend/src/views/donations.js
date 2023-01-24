import React from 'react';
import { Helmet } from 'react-helmet';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

const DonationsPage = props => {
  return (
    <div className="DonationsPage">
      <Helmet title="Donations" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Donations</h1>
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

export default DonationsPage;
