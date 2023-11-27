import React from "react";
import { Link } from "react-router-dom";

import "./BannerButtons.scss";

const BannerButtons = ({ className }) => {
  // Add classes
  var classNames = ["BannerButtons"];

  // Add additional classes
  classNames.push(className);

  return (
    <div className={classNames.join(" ")}>
      <div className="container">
        <div className="form-row my-n2">
          <div className="col-sm-6 col-md-3 my-2 banner-button">
            <Link to="/report" className="btn btn-lg btn-transparent">
              <i className="fa-fw fas fa-eye mr-1" />
              Report
              <span className="d-md-none d-lg-inline"> Observation</span>
            </Link>
          </div>
          <div className="col-sm-6 col-md-3 my-2 banner-button">
            <Link to="/birds" className="btn btn-lg btn-transparent">
              <i className="fa-fw fas fa-search mr-1" />
              <span className="d-md-none d-lg-inline">Search </span>Birds
            </Link>
          </div>
          <div className="col-sm-6 col-md-3 my-2 banner-button">
            <Link to="/observations" className="btn btn-lg btn-transparent">
              <i className="fa-fw fas fa-list-alt mr-1" />
              <span className="d-md-none d-lg-inline">View </span>
              Observations
            </Link>
          </div>
          <div className="col-sm-6 col-md-3 my-2 banner-button">
            <Link to="/sponsor" className="btn btn-lg btn-transparent">
              <i className="fa-fw fas fa-hands-helping mr-1" />
              Donations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerButtons;
