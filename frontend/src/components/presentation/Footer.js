import React from 'react';
import { NavLink } from 'react-router-dom';

import logo_grey from '../../assets/img/logo_grey.svg';

import './Footer.scss';

const Footer = props => {
  return (
    <footer className="d-print-none">
      <div className="constrainer">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <p className="footer-sponsor">
                Kea Database data hosted in New Zealand on{' '}
                <a
                  href="https://www.catalyst.net.nz/products/gis-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="catalyst"
                >
                  Catalyst GIS Core
                </a>
                .
              </p>
              <nav>
                <ul className="footer-links my-2">
                  <li>
                    <NavLink exact to="/">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/sponsor">Sponsor Kea</NavLink>
                  </li>
                  <li>
                    <NavLink to="/help">Help</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/licence">Licence/Copyright</NavLink>
                  </li>
                  <li>
                    <NavLink to="/terms">Terms/Privacy</NavLink>
                  </li>
                  <li>
                    <a href="https://blog.keadatabase.nz">Blog</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-4">
              <div className="footer-attribution my-2">
                <div className="d-inline-block text-right">
                  <img src={logo_grey} alt="Kea Database" className="logo" />
                  <p className="version">{process.env.REACT_APP_VERSION}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
