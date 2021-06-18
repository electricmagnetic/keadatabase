import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import Page from '../../components/presentation/Page';
import Banner from '../../components/presentation/Banner';

class ReportObservationSuccessPage extends Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <div className="SuccessPage">
        <Helmet title="Thanks!" />
        <Banner size="small" className="mb-3">
          <h1>Thanks!</h1>
        </Banner>
        <div className="container">
          <section className="mb-3">
            <div className="btn-toolbar" role="toolbar">
              <Link to="/report" className="btn btn-primary mr-2" role="button">
                Report Another
              </Link>
              {id && (
                <Link
                  to={'/observations/' + this.props.match.params.id}
                  className="btn btn-outline-primary"
                  role="button"
                >
                  View Observation
                </Link>
              )}
            </div>
          </section>
          <section>
            <Page id={191} hideTitle />
          </section>
        </div>
      </div>
    );
  }
}

export default ReportObservationSuccessPage;
