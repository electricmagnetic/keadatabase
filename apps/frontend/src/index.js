import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import Moment from "react-moment";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "moment/locale/en-nz";

import "jquery/dist/jquery.slim";
import "bootstrap/dist/js/bootstrap.bundle";

import "./assets/css/custom.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

Moment.globalLocale = "en-nz";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: `${process.env.REACT_APP_SENTRY_DSN}`,
    release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.5,
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
