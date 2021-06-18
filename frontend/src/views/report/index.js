import React from 'react';
import { Helmet } from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import ReportObservation from '../../components/report/ReportObservation';

const ReportObservationPage = props => {
  return (
    <div className="ReportObservationPage">
      <Helmet title="Report Observation" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Report Observation</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <ReportObservation />
        </div>
      </section>
    </div>
  );
};

export default ReportObservationPage;
