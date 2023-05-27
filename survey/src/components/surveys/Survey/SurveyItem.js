import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormatDate from '../../helpers/FormatDate';
import getUniqueGridTiles from '../../helpers/getUniqueGridTiles';

/**
  Presents a nicely formatted list item for a given survey.
 */
const SurveyItem = ({ survey }) => {
  const gridTileIds = getUniqueGridTiles(survey.hours);

  return (
    <div className="SurveyItem card mb-1">
      <div className="card-body">
        <div className="row">
          <div className="col-md-1 field-id">
            <strong>
              <Link to={`/surveys/${survey.id}`}>#{survey.id}</Link>
            </strong>
          </div>
          <div className="col-md-2 field-date">
            <i className="fa-fw fas fa-calendar-alt mr-3"></i>
            <FormatDate format="medium">{survey.date}</FormatDate>
          </div>
          <div className="col-md-3 field-observer">
            <i className="fa-fw fas fa-user mr-3"></i>
            {survey.observer}
          </div>
          <div className="col-md-4 field-gridTile">
            <i className="fa-fw fas fa-map mr-3"></i>
            {gridTileIds.slice(0, 3).map(gridTileId => (
              <Link to={`/grid/${gridTileId}`} key={gridTileId} className="mr-3">
                {gridTileId}
              </Link>
            ))}
            {gridTileIds.length > 3 && <span className="more">…</span>}
          </div>
          <div className="col-md-2">
            <i className="fa-fw fas fa-info-circle mr-3"></i>
            <Link to={`/surveys/${survey.id}`}>View</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

SurveyItem.propTypes = {
  survey: PropTypes.object.isRequired,
};

export default SurveyItem;
