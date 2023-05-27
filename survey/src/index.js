import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'moment/locale/en-nz';

import 'jquery/dist/jquery.slim';
import 'bootstrap/dist/js/bootstrap.bundle';

import './assets/css/custom.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

Moment.globalLocale = 'en-nz';

Sentry.init({
  dsn: `${process.env.REACT_APP_SENTRY_DSN}`,
  release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
