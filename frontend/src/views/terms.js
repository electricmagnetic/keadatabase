import React from 'react';
import { Helmet } from 'react-helmet';

import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

const TermsPage = props => {
  return (
    <div className="TermsPage">
      <Helmet title="Terms/Privacy" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Terms of Use &amp; Privacy Policy</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <Page id={3} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
