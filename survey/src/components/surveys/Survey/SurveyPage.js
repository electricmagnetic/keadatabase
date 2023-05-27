import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SurveyHour from '../SurveyHour';
import FormatDate from '../../helpers/FormatDate';
import GridTile from '../../grid/GridTile';
import SurveyAnalysis from '../../analysis/SurveyAnalysis';
import getUniqueGridTiles from '../../helpers/getUniqueGridTiles';
import SelectedGridTilesMap from '../../map/SelectedGridTilesMap';

/**
  Presents a nicely formatted page for a given survey.
 */
const SurveyPage = ({ survey }) => {
  const gridTileIds = getUniqueGridTiles(survey.hours);

  return (
    <div className="SurveyPage">
      <section className="mb-5">
        <h2>Details</h2>
        <dl>
          <div className="row">
            <div className="col-md-4">
              <dt>Date</dt>
              <dd>
                <FormatDate>{survey.date}</FormatDate>
              </dd>
            </div>
            <div className="col-md-4">
              <dt>Observer</dt>
              <dd>{survey.observer}</dd>
            </div>
            {survey.max_flock_size && (
              <div className="col-md-4">
                <dt>Max Kea Seen</dt>
                <dd>{survey.max_flock_size}</dd>
              </div>
            )}
          </div>
          {survey.comments && (
            <>
              <dt>Comments</dt>
              <dd>{survey.comments}</dd>
            </>
          )}
        </dl>
      </section>
      <section className="mb-5">
        <h2>Analysis</h2>
        <SurveyAnalysis id={survey.id} />
      </section>
      <section className="mb-5">
        <h2>Hours</h2>
        {survey.hours.map(surveyHour => (
          <SurveyHour surveyHour={surveyHour} key={surveyHour.id} type="item" />
        ))}
      </section>
      <section className="mb-5">
        <h2>Map</h2>
        <SelectedGridTilesMap gridTileIds={gridTileIds} />
      </section>
      <section className="mb-5">
        <h2>Grid Tiles</h2>
        <div className="row my-n3">
          {gridTileIds.map(gridTileId => (
            <div className="col-6 col-md-3 col-lg-2" key={gridTileId}>
              <Link to={`/grid/${gridTileId}`}>
                <GridTile id={gridTileId} hideDetails type="card" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

SurveyPage.propTypes = {
  survey: PropTypes.object.isRequired,
};

export default SurveyPage;
