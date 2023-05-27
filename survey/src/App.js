import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { Header, HomePageHeader } from './components/presentation/Header';
import { Footer, SubmitPageFooter } from './components/presentation/Footer';
import Loader from './components/helpers/Loader';

import HomePage from './views/index';
import NoMatchPage from './views/nomatch';

const AboutPage = lazy(() => import('./views/about'));
const LegalPage = lazy(() => import('./views/legal'));
const InstructionsPage = lazy(() => import('./views/instructions'));

const SubmissionPage = lazy(() => import('./views/submit/index'));
const SubmissionSuccessPage = lazy(() => import('./views/submit/success'));

const GridPage = lazy(() => import('./views/grid/index'));
const GridDetailPage = lazy(() => import('./views/grid/detail'));
const AnalysisPage = lazy(() => import('./views/analysis/index'));
const SurveyPage = lazy(() => import('./views/surveys/index'));
const SurveyDetailPage = lazy(() => import('./views/surveys/detail'));

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

const OtherPagesContainer = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <main>
          <div className="constrainer">
            <Switch>
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/legal" component={LegalPage} />
              <Route exact path="/instructions" component={InstructionsPage} />

              <Route exact path="/submit" component={SubmissionPage} />
              <Route exact path="/submit/success" component={SubmissionSuccessPage} />
              <Route exact path="/submit/success/:slug" component={SubmissionSuccessPage} />

              <Route exact path="/grid" component={GridPage} />
              <Route exact path="/grid/:slug" component={GridDetailPage} />

              <Route exact path="/analysis" component={AnalysisPage} />

              <Route exact path="/surveys" component={SurveyPage} />
              <Route exact path="/surveys/:slug" component={SurveyDetailPage} />

              <Route component={NoMatchPage} />
            </Switch>
          </div>
        </main>
      </Suspense>
    </>
  );
};

const HomePageContainer = () => {
  return (
    <>
      <HomePageHeader />
      <main>
        <HomePage />
      </main>
    </>
  );
};

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        dedupingInterval: CACHE_TIME,
        revalidateOnFocus: false,
      }}
    >
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePageContainer} />
            <Route component={OtherPagesContainer} />
          </Switch>
          <Switch>
            <Route exact path="/submit" component={SubmitPageFooter} />
            <Route component={Footer} />
          </Switch>
        </div>
      </Router>
    </SWRConfig>
  );
}

export default App;
