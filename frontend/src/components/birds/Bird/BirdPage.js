import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Banner from '../../presentation/Banner';
import generateSummary from './helpers/generateSummary';
import getPicture from './helpers/getPicture';
import BirdObservations from '../../observations/BirdObservations';
import PrettyBandCombo from './helpers/PrettyBandCombo';

import './BirdPage.scss';

/**
  Presents a nicely formatted page for a given bird.
 */
const BirdPage = ({ bird }) => {
  const { bird_extended } = bird;

  return (
    <div className="BirdPage">
      <Helmet title={`${bird.name} (Bird)`} />
      <section className="mb-5">
        <Banner size="small">
          <div className="row">
            <div className="col-md-4 order-md-9 profile-picture">
              <figure>
                <img
                  src={getPicture(bird, 'large')}
                  alt={bird.name}
                  className={`img-fluid img-thumbnail ${bird.status === 'Dead' && 'isDead'}`}
                />
                {bird_extended && (
                  <>
                    {bird_extended.profile_picture_attribution && (
                      <figcaption className="text-right my-2">
                        <i className="fas fa-camera mr-2" />
                        {bird_extended.profile_picture_attribution}
                      </figcaption>
                    )}
                  </>
                )}
              </figure>
            </div>

            <div className="col-md-8 order-md-1">
              <h1 className="mb-3">{bird.name}</h1>
              <ul className="list-unstyled mb-3">
                <li>
                  <i className="fas fa-fw fa-info-circle" /> {generateSummary(bird)}
                </li>
                <li>
                  <i className="fas fa-fw fa-map-marker-alt" /> {bird.study_area}
                </li>
                {bird.band_combo && (
                  <li>
                    <i className="far fa-fw fa-circle" /> {bird.band_combo}
                  </li>
                )}
              </ul>
              <div className="band-combo">
                <PrettyBandCombo bandCombo={bird.band_combo} />
              </div>
            </div>
          </div>
        </Banner>
      </section>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mb-5">
            {bird_extended && (
              <>
                <p className="description">{bird_extended.description}</p>
                {bird_extended.sponsor_name && (
                  <dl className="sponsor">
                    <dt>Sponsor</dt>
                    <dd>
                      {bird_extended.sponsor_website ? (
                        <a
                          href={bird_extended.sponsor_website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {bird_extended.sponsor_name}
                        </a>
                      ) : (
                        bird_extended.sponsor_name
                      )}
                    </dd>
                  </dl>
                )}
              </>
            )}
          </div>
        </div>
        <section>
          <h2>Recent observations</h2>
          <section className="mb-3">
            <BirdObservations queryString={`?bird=${bird.slug}&page_size=24`} type="map" />
          </section>
          <section className="mb-5">
            <div className="row">
              <BirdObservations
                queryString={`?bird=${bird.slug}&page_size=24`}
                className="col-6 col-sm-4 col-lg-3 mb-3"
                type="observationCard"
              />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

BirdPage.propTypes = {
  bird: PropTypes.object.isRequired,
};

export default BirdPage;
