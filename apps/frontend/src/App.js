import React, { Component, Suspense, lazy } from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { QueryParamProvider } from "use-query-params";

import initGa from "./analytics";
import history from "./history";

import { getQueryFn } from "./components/api";
import Loader from "./components/helpers/Loader";
import ScrollToTop from "./components/helpers/ScrollToTop";
import Header from "./components/presentation/Header";
import Footer from "./components/presentation/Footer";

import HomePage from "./views/index";
import NoMatchPage from "./views/nomatch";

const AboutPage = lazy(() => import("./views/about"));
const TermsPage = lazy(() => import("./views/terms"));
const LicencePage = lazy(() => import("./views/licence"));
const DonationsPage = lazy(() => import("./views/donations"));
const HelpPage = lazy(() => import("./views/help"));

const BirdsPage = lazy(() => import("./views/birds/index"));
const BirdDetailPage = lazy(() => import("./views/birds/detail"));

const ObservationsPage = lazy(() => import("./views/observations/index"));
const ObservationDetailPage = lazy(() => import("./views/observations/detail"));

const ReportObservationPage = lazy(() => import("./views/report/index"));
const ReportObservationSuccessPage = lazy(
  () => import("./views/report/success"),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn,
      retry: false,
      staleTime: 10 * 1000,
      keepPreviousData: true,
    },
  },
});

initGa(history);

class App extends Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <ScrollToTop>
              <div className="Router">
                <Header />

                <Suspense fallback={<Loader />}>
                  <main className="constrainer">
                    <Switch>
                      <Route exact path="/" component={HomePage} />

                      <Route exact path="/about" component={AboutPage} />
                      <Route exact path="/terms" component={TermsPage} />
                      <Route exact path="/licence" component={LicencePage} />
                      <Route
                        exact
                        path="/donations"
                        component={DonationsPage}
                      />
                      <Route exact path="/help" component={HelpPage} />

                      <Route exact path="/birds" component={BirdsPage} />
                      <Route
                        exact
                        path="/birds/:slug"
                        component={BirdDetailPage}
                      />

                      <Route
                        exact
                        path="/observations"
                        component={ObservationsPage}
                      />
                      <Route
                        exact
                        path="/observations/:id"
                        component={ObservationDetailPage}
                      />

                      <Route
                        exact
                        path="/report"
                        component={ReportObservationPage}
                      />
                      <Route
                        exact
                        path="/report/success"
                        component={ReportObservationSuccessPage}
                      />
                      <Route
                        exact
                        path="/report/success/:id"
                        component={ReportObservationSuccessPage}
                      />

                      {/* Deprecated but retained to prevent broken URLs */}
                      <Redirect exact from="/sightings" to="/observations" />
                      <Redirect
                        exact
                        from="/sightings/:id"
                        to="/observations/:id"
                      />
                      <Redirect exact from="/report/sighting" to="/report" />
                      <Redirect exact from="/sponsor" to="/donations" />

                      <Route component={NoMatchPage} />
                    </Switch>
                  </main>
                </Suspense>

                <Footer />
              </div>
            </ScrollToTop>
          </QueryParamProvider>
        </Router>
      </QueryClientProvider>
    );
  }
}

export default App;
