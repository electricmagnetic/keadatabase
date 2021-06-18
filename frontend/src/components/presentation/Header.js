import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';
import './Header.scss';

const Header = props => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Kea Database" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                <i className="fa-fw fas fa-home mr-2" />
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/birds" className="nav-link">
                <i className="fa-fw fas fa-search mr-2" />
                <span className="d-md-none d-lg-inline">Search </span>Birds
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/observations" className="nav-link">
                <i className="fa-fw fas fa-list-alt mr-2" />
                <span className="d-md-none d-lg-inline">View </span>
                Observations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/report" className="nav-link">
                <i className="fa-fw fas fa-eye mr-2" />
                Report
                <span className="d-md-none d-lg-inline"> Observation</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
