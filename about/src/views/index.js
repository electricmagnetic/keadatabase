import React from 'react';

import Footer from '../components/presentation/Footer';
import Statistics from '../components/Statistics';

import logo from '../assets/img/logo.svg';

const HomePage = () => {
  const databaseStatistics = [
    { label: 'banded birds', valueKey: 'count', endpoint: '/birds/' },
    { label: 'observations recorded', valueKey: 'count', endpoint: '/observations/' },
    { label: 'birds observed', valueKey: 'count', endpoint: '/bird_observations/' },
  ];

  const surveyStatistics = [
    { label: 'surveys recorded', valueKey: 'count', endpoint: '/surveys/surveys/'},
    { label: 'grid squares surveyed', valueKey: 'length', endpoint: '/analysis/grid_tiles/'},
  ];

  return <div className="HomePage">
    <main>
      <section className="bg-faded">
        <div className="container py-5">
          <img src={logo} alt="Kea Database logo" className="logo" />
          <h1 className="mb-4">
            Kea Sightings Project
          </h1>
          <p className="lead">
            The Kea Sightings Project aims to help Aotearoa/New Zealand's native kea (
            <em>Nestor notabilis</em>). The goal is to understand more about kea populations, what they get up to, and where they go.
          </p>
        </div>
      </section>
      <section className="">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-8">
              <h2>Database Statistics</h2>
              <Statistics statistics={databaseStatistics} className="text-primary" />
            </div>
            <div className="col-md-4">
              <h2>Survey Statistics</h2>
              <Statistics statistics={surveyStatistics} className="text-secondary" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light">
        <div className="container py-5">
          <h2>About</h2>
          <p>The Kea Sightings Project was initiated by Mark Brabyn, Dr. Laura Young and George Moon in 2016, with support from a large number of people and organisations.</p>
          <p>Presently the project is maintained by Laura Young, George Moon and Di Cowan.</p>
          <p>We also work closely with the Arthur’s Pass Wildlife Trust and the Department of Conservation.</p>
          <p>The database was built by George Moon (ElectricMagnetic), using base kea data provided by the Department of Conservation (Nelson). Further development support was provided by Catalyst IT.</p>
        </div>
      </section>
      <section className="">
        <div className="container py-5">
          <h2>Contact</h2>
            <p>The easiest way to get in contact is by sending us an email: <a href="mailto:contact@keadatabase.nz">contact@keadatabase.nz</a></p>
            <p>
              We’d prefer it if you logged your sightings/non-sightings online, however paper sighting forms can be sent to:
            </p>
            <p>
              <em>Arthur’s Pass Visitor Centre</em><br />
              Department of Conservation<br />
              PO Box 51008,<br />
              Arthur’s Pass 7652
            </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
};

export default HomePage;
