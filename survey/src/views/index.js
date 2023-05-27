import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import GridTilesFromSurveyHours from '../components/grid/GridTilesFromSurveyHours';
import Banner from '../components/presentation/Banner';
import Page from '../components/presentation/Page';

import banner from '../assets/img/banner.jpg';

const HomePage = props => {
  return (
    <div className="HomePage">
      <Helmet title="Kea Survey Tool" />
      <section>
        <Banner backgroundImage={banner} size="home">
          <h1 className="mb-4 banner-title">Kea Survey Tool</h1>
          <div className="home-buttons">
            <Link to="/submit" className="btn btn-lg btn-primary mr-2 mb-2">
              <i className="fa-fw fas fa-clipboard-list mr-1"></i>Submit Survey
            </Link>
            <Link to="/instructions" className="btn btn-lg btn-light mr-2 mb-2">
              <i className="fa-fw fas fa-question-circle mr-1"></i>How To Survey
            </Link>
          </div>
          <div className="home-buttons">
            <a
              href="https://geo.keadatabase.nz/survey/form_20191219.pdf"
              className="btn btn-light mr-1 mb-1"
            >
              <i className="fa-fw fas fa-file-download mr-1"></i>Paper Form
            </a>
            <Link to="/grid" className="btn btn-light mr-1 mb-1">
              <i className="fa-fw fas fa-map mr-1"></i>View Grid Map
            </Link>
            <Link to="/surveys" className="btn btn-light mr-1 mb-1">
              <i className="fa-fw fas fa-list-alt mr-1"></i>Browse Surveys
            </Link>
          </div>
        </Banner>
      </section>
      <div className="constrainer">
        <section className="my-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Page id={480} hideTitle />
              </div>
              <div className="col-md-6">
                <h2>Recent Grid Tiles</h2>
                <GridTilesFromSurveyHours type="card" hideDetails limit={8} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
