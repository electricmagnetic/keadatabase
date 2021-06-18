import React from 'react';

import './Sponsors.scss';

const Sponsors = props => {
  return (
    <div className="Sponsors pt-4 pb-2">
      <div className="container">
        <h2 className="sr-only">Sponsors & Supporters</h2>
        <p>
          Thank you very much for the generous support of our sponsors. This project simply wouldn't
          have been possible without them!
        </p>
        <div className="row">
          <div className="col-sm-8">
            <h3>Sponsors</h3>
            <div className="row">
              <div className="col-sm-6">
                <ul>
                  <li>
                    <a href="http://activeadventures.com" rel="noopener noreferrer" target="_blank">
                      Active Adventures
                    </a>
                  </li>
                  <li>
                    <a href="https://thebealeyhotel.com" rel="noopener noreferrer" target="_blank">
                      The Bealey Hotel
                    </a>
                  </li>
                  <li>
                    <a href="http://catalyst.net.nz" rel="noopener noreferrer" target="_blank">
                      Catalyst
                    </a>
                  </li>
                  <li>
                    <a href="http://engco.co.nz" rel="noopener noreferrer" target="_blank">
                      ENGCO
                    </a>
                  </li>
                  <li>
                    <a href="http://hirepool.co.nz" rel="noopener noreferrer" target="_blank">
                      Hirepool
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6">
                <ul>
                  <li>
                    <a
                      href="https://builderscrack.co.nz/tradies/r9b36vw/jamie-ward-builder-limited"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Jamie Ward Builder
                    </a>
                  </li>
                  <li>
                    <a href="http://kathmandu.co.nz" rel="noopener noreferrer" target="_blank">
                      Kathmandu
                    </a>
                  </li>
                  <li>
                    <a href="http://orillion.com" rel="noopener noreferrer" target="_blank">
                      Orillion
                    </a>
                  </li>
                  <li>
                    <a href="http://placemakers.co.nz" rel="noopener noreferrer" target="_blank">
                      PlaceMakers Riccarton
                    </a>
                  </li>
                  <li>
                    <a href="http://timezoneone.com" rel="noopener noreferrer" target="_blank">
                      TimeZoneOne
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <h3>Supporters</h3>
            <ul>
              <li>
                <a href="http://doc.govt.nz" rel="noopener noreferrer" target="_blank">
                  Department of Conservation
                </a>
              </li>
              <li>
                <a href="http://keaconservation.co.nz" rel="noopener noreferrer" target="_blank">
                  Kea Conservation Trust
                </a>
              </li>
              <li>
                <a href="http://apwt.org.nz/" rel="noopener noreferrer" target="_blank">
                  Arthur's Pass Wildlife Trust
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
