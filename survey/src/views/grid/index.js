import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import GridTileTool from '../../components/grid/GridTileTool';

const DownloadLink = ({ title, filename }) => {
  return (
    <li>
      <a href={`https://geo.keadatabase.nz/grid/${filename}`} className="mr-3 mb-3">
        <i className="fa-fw fas fa-file-download mr-1"></i>Download {title}
      </a>
    </li>
  );
};

const GridPage = props => {
  return (
    <div className="GridPage">
      <Helmet title="Grid Map" />
      <section className="d-print-none">
        <Banner size="small">
          <h1>Grid Map</h1>
          <p className="lead">
            Grid tiles are 5km by 5km and are at regular intervals on the standard Topo50 map grid.
          </p>
        </Banner>
      </section>
      <section>
        <GridTileTool />
      </section>
      <section className="bg-faded py-5 d-print-none">
        <div className="container">
          <h2>Download Grid</h2>
          <p>
            The kea survey grid is based on the{' '}
            <a href="https://birdatlas.co.nz/" target="_blank" rel="noopener noreferrer">
              New Zealand Bird Atlas
            </a>{' '}
            grid tiles.
          </p>
          <p>
            Each kea survey grid tile matches the ID of a bird atlas 10km by 10km tile, but has been
            further divided into four 5km by 5km tiles with one of four cardinal marker suffixes
            (NW/NE/SW/SE).
          </p>
          <div className="row">
            <div className="col-md-6">
              <h3>Garmin KMZ grids</h3>
              <ul className="nav flex-column mb-3">
                <DownloadLink title="South Island" filename="garmin/SouthIsland.kmz" />
                <DownloadLink title="Kahurangi" filename="garmin/Kahurangi.kmz" />
                <DownloadLink
                  title="Nelson Lakes &amp; Kaikoura"
                  filename="garmin/NelsonLakes-Kaikoura.kmz"
                />
                <DownloadLink title="Mid Canterbury" filename="garmin/MidCanterbury.kmz" />
                <DownloadLink title="Aoraki &amp; Franz Josef" filename="garmin/Aoraki-Franz.kmz" />
                <DownloadLink
                  title="Wanaka &amp; North Fiordland"
                  filename="garmin/Wanaka-NorthFiordland.kmz"
                />
                <DownloadLink
                  title="Wakatipu &amp; Mid Fiordland"
                  filename="garmin/Wakatipu-MidFiordland.kmz"
                />
                <DownloadLink title="South Fiordland" filename="garmin/SouthFiordland.kmz" />
              </ul>
              <p>
                These files can be loaded directly onto commonly used Garmin GPS models, into the{' '}
                <code>Garmin/CustomMaps</code> folder.
              </p>
            </div>
            <div className="col-md-6">
              <h3>Other formats</h3>
              <ul className="nav flex-column mb-3">
                <DownloadLink title="GPX" filename="grid_tiles.gpx" />
                <DownloadLink title="GeoJSON" filename="grid_tiles.geojson" />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GridPage;
