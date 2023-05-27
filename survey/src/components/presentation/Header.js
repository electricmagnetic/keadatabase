import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';
import './Header.scss';

/**
  Main header. Different CSS/functionality behaviour can be toggled by prop `onHome`.
  */
const Header = ({ onHome }) => {
  const headerClassNames = ['header', onHome ? 'on-home' : 'not-home'];

  const navClassNames = [
    'navbar',
    'navbar-expand-lg',
    onHome ? 'navbar-light' : 'navbar-dark',
    onHome ? '' : 'bg-dark',
  ];

  return (
    <header className={headerClassNames.join(' ')}>
      <nav className={navClassNames.join(' ')}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Kea Survey Tool" className="pr-3" />
            Kea Survey Tool
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
                  <i className="fa-fw fas fa-home mr-2"></i>Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/surveys" className="nav-link">
                  <i className="fa-fw fas fa-list-alt mr-2"></i>
                  <span className="d-lg-none d-xl-inline">Browse </span>Surveys
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/grid" className="nav-link">
                  <i className="fa-fw fas fa-map mr-2"></i>
                  Grid Map
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/analysis" className="nav-link">
                  <i className="fa-fw fas fa-chart-bar mr-2"></i>
                  Analysis
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/submit" className="nav-link">
                  <i className="fa-fw fas fa-clipboard-list mr-2"></i>Submit
                  <span className="d-lg-none d-xl-inline"> Survey</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.defaultProps = {
  onHome: false,
};

/**
  Sets onHome property to true.
  */
const HomePageHeader = ({ onHome }) => {
  return <Header onHome />;
};

export { Header, HomePageHeader };
