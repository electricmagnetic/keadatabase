import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../components/presentation/Banner';

const NoMatchPage = props => {
  return (
    <div className="NoMatchPage">
      <Helmet title="Page Not Found" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Page Not Found</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <p>
            You seem to have encountered a page that doesn't exist. If you think it should exist,
            please contact us and we'll look into it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default NoMatchPage;
