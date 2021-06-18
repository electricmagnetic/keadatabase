import React, { Component } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import configureStore from './store/store';
import initGa from './analytics';
import history from './history';

import ScrollToTop from './components/helpers/ScrollToTop';
import Header from './components/presentation/Header';
import Footer from './components/presentation/Footer';

import HomePage from './views/index';

import AboutPage from './views/about';
import TermsPage from './views/terms';
import LicencePage from './views/licence';
import SponsorPage from './views/sponsor';
import HelpPage from './views/help';

import BirdsPage from './views/birds/index';
import BirdDetailPage from './views/birds/detail';

import ObservationsPage from './views/observations/index';
import ObservationDetailPage from './views/observations/detail';

import ReportObservationPage from './views/report/index';
import ReportObservationSuccessPage from './views/report/success';

import NoMatchPage from './views/nomatch';

const CACHE_TIME = 24 * 60 * 60 * 1000;
const fetcher = async url => {
  const result = await fetch(url);

  if (!result.ok) {
    const error = new Error('An error occurred while fetching the data.');

    error.info = await result.json();
    error.status = result.status;
    throw error;
  }
  return result.json();
};

const store = configureStore();

initGa(history);

class App extends Component {
  render() {
    return (
      <SWRConfig
        value={{
          fetcher: fetcher,
          dedupingInterval: CACHE_TIME,
          revalidateOnFocus: false,
        }}
      >
        <Provider store={store}>
          <Router history={history}>
            <ScrollToTop>
              <div className="Router">
                <Header />

                <main className="constrainer">
                  <Switch>
                    <Route exact path="/" component={HomePage} />

                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/terms" component={TermsPage} />
                    <Route exact path="/licence" component={LicencePage} />
                    <Route exact path="/sponsor" component={SponsorPage} />
                    <Route exact path="/help" component={HelpPage} />

                    <Route exact path="/birds" component={BirdsPage} />
                    <Route exact path="/birds/:slug" component={BirdDetailPage} />

                    <Route exact path="/observations" component={ObservationsPage} />
                    <Route exact path="/observations/:id" component={ObservationDetailPage} />

                    <Route exact path="/report" component={ReportObservationPage} />
                    <Route exact path="/report/success" component={ReportObservationSuccessPage} />
                    <Route
                      exact
                      path="/report/success/:id"
                      component={ReportObservationSuccessPage}
                    />

                    {/* Deprecated but retained to prevent broken URLs */}
                    <Redirect exact from="/sightings" to="/observations" />
                    <Redirect exact from="/sightings/:id" to="/observations/:id" />
                    <Redirect exact from="/report/sighting" to="/report" />

                    <Route component={NoMatchPage} />
                  </Switch>
                </main>

                <Footer />
              </div>
            </ScrollToTop>
          </Router>
        </Provider>
      </SWRConfig>
    );
  }
}

export default App;
