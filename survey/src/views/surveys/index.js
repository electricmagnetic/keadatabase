import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import Surveys from '../../components/surveys/Surveys';
import GridTilesFromSurveyHours from '../../components/grid/GridTilesFromSurveyHours';

const SurveyPage = props => {
  return (
    <div className="SurveyPage">
      <Helmet title="Browse Surveys" />
      <section className="mb-5">
        <Banner size="small">
          <h1>Browse Surveys</h1>
        </Banner>
      </section>
      <section className="mb-5">
        <div className="container">
          <h2>
            Recent Surveys <small>(last 50)</small>
          </h2>
          <Surveys type="item" queryString="?page_size=50" />
        </div>
      </section>
      <section className="mb-5">
        <div className="container">
          <h2>Recently Surveyed Tiles</h2>
          <GridTilesFromSurveyHours
            type="card"
            hideDetails
            limit={8}
            classes="col-6 col-sm-4 col-md-3 col-lg-2"
          />
        </div>
      </section>
    </div>
  );
};

export default SurveyPage;
