import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

/**
  Main footer. Different CSS/functionality behaviour can be toggled by prop `onSubmitPage`.
  */
const Footer = ({ onSubmitPage }) => {
  const footerClassNames = ['d-print-none', onSubmitPage && 'on-submit-page'];

  return (
    <footer className={footerClassNames.join(' ')}>
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
                . Map data from LINZ (CC BY 4.0).
              </p>
              <nav>
                <ul className="footer-links my-2">
                  <li>
                    <NavLink exact to="/">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/instructions">How To Survey</NavLink>
                  </li>
                  <li>
                    <NavLink to="/legal">Legal</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">About</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-4">
              <div className="footer-attribution my-2">
                <div className="d-inline-block text-right">
                  <p className="logo">Kea Survey Tool</p>
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

Footer.defaultProps = {
  onSubmitPage: false,
};

/**
  Sets onSubmitPage property to true.
  */
const SubmitPageFooter = ({ onSubmitPage }) => {
  return <Footer onSubmitPage />;
};

export { Footer, SubmitPageFooter };
