import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '../components/presentation/Page';
import Posts from '../components/presentation/Posts';
import Banner from '../components/presentation/Banner';
import BannerButtons from '../components/presentation/BannerButtons';
import BirdObservations from '../components/observations/BirdObservations';
import Birds from '../components/birds/Birds';
import Sponsors from '../components/presentation/Sponsors';

import banner from '../assets/img/banners/home.jpg';

const HomePage = props => {
  return (
    <div className="HomePage">
      <Helmet title="Kea Database" />
      <section className="mb-4">
        <Banner backgroundImage={banner}>
          <Page id={34} hideTitle />
        </Banner>
        <BannerButtons />
      </section>
      <section className="mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Page id={24} />
            </div>
            <div className="col-md-6">
              <Page id={27} />
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4">
        <Banner size="small" className="bg-primary text-white">
          <h2 className="h4 text-center mt-0 mb-3">Featured birds</h2>
          <div className="row">
            <Birds
              type="feature"
              queryString="?is_featured=true&ordering=random&page_size=4"
              className="col-6 col-lg-3 mb-3"
            />
          </div>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="mb-3">Recently observed</h2>
              <div className="row">
                <BirdObservations
                  type="feature"
                  queryString="?has_bird=true&page_size=4"
                  className="col-6 col-sm-3 col-md-6 col-lg-3 mb-3"
                />
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="mb-3">Blog</h2>
              <Posts />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Sponsors />
      </section>
    </div>
  );
};

export default HomePage;
