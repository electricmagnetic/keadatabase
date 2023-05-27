import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import SubmissionForm from '../../components/submit/SubmissionForm';

class SubmissionPage extends Component {
  render() {
    return (
      <div className="SubmissionPage">
        <Helmet title="Submit Survey" />
        <section className="mb-5">
          <Banner size="small">
            <h1>Submit Survey</h1>
          </Banner>
        </section>
        <SubmissionForm />
      </div>
    );
  }
}

export default SubmissionPage;
