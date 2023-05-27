import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import Banner from '../../components/presentation/Banner';
import Page from '../../components/presentation/Page';

const SubmissionSuccessPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="SubmissionSuccessPage">
      <Helmet title="Survey Submitted" />
      <section className="mb-5">
        <Banner size="small" additionalClasses="mb-3">
          <h1 className="mb-3">Thanks!</h1>
          <p className="lead">
            Your survey {slug && `(#${slug})`} has been successfully submitted.
          </p>
          <Link to="/submit" className="btn btn-primary mr-3" role="button">
            Report Another
          </Link>
          {slug && (
            <Link to={'/surveys/' + slug} className="btn btn-light mr-3" role="button">
              View Survey
            </Link>
          )}
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Page id={556} hideTitle />
        </div>
      </section>
    </div>
  );
};

export default SubmissionSuccessPage;
