import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import Survey from '../../components/surveys/Survey';

const SurveyDetailPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="SurveyDetailPage">
      <Helmet title={`#${slug} (Survey)`} />
      <section className="mb-5">
        <Banner size="small">
          <h1>Survey #{slug}</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <Survey id={slug} type="page" />
        </div>
      </section>
    </div>
  );
};

export default SurveyDetailPage;
