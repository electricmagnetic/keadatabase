import ReactGA from 'react-ga';

const trackPageView = location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
};

const initGa = history => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(process.env.REACT_APP_GA_ID);
    ReactGA.set({ dimension1: process.env.REACT_APP_VERSION });

    trackPageView(history.location);
    history.listen(trackPageView);
  }
};

export { initGa as default, trackPageView };
