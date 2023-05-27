import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormatDate from '../../helpers/FormatDate';
import { ActivityIcon, KeaIcon } from '../../helpers/Icons';

import './SurveyHour.scss';

/**
  Presents a nicely formatted list item for a given survey hour.
  `swapGridTileSurvey` enables toggling betwen showing the grid tile or the survey ID.
 */
const SurveyHourItem = ({ surveyHour, swapGridTileSurvey }) => {
  const hasKea = surveyHour.kea;
  const notSurveying = surveyHour.activity === 'X';
  const showSurvey = swapGridTileSurvey;
  const showGridTile = !swapGridTileSurvey;

  const classNames = [
    'SurveyHourItem',
    'card',
    'mb-1',
    hasKea && 'hasKea',
    `activity-${surveyHour.activity}`,
  ];

  return (
    <div className={classNames.join(' ')}>
      <div className="card-body">
        <div className="row">
          {showSurvey && (
            <div className="col-md-2 field-survey-date">
              <i className="fa-fw fas fa-calendar mr-2"></i>
              <FormatDate format="short">{surveyHour.survey__date}</FormatDate>
            </div>
          )}
          <div className="col-md-2 field-hour">
            <i className="fa-fw fas fa-clock mr-2"></i>
            {surveyHour.get_hour_display}
          </div>
          <div className="col-md-4 field-activity">
            <ActivityIcon activity={surveyHour.activity} />
            {surveyHour.get_activity_display}
          </div>
          {!notSurveying && (
            <>
              <div className="col-md-2 field-kea">
                <KeaIcon hasKea={hasKea} />
                {hasKea ? 'Kea' : 'No kea'}
              </div>
              {showGridTile && (
                <div className="col-md-4 field-gridTile">
                  <i className="fa-fw fas fa-map-marker-alt mr-2"></i>
                  <Link to={`/grid/${surveyHour.grid_tile}`}>{surveyHour.grid_tile}</Link>
                </div>
              )}
            </>
          )}
          {showSurvey && (
            <div className="col-md-2 field-survey">
              <i className="fa-fw fas fa-clipboard-list mr-2"></i>
              <Link to={`/surveys/${surveyHour.survey}`}>#{surveyHour.survey}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SurveyHourItem.propTypes = {
  surveyHour: PropTypes.object.isRequired,
  swapGridTileSurvey: PropTypes.bool.isRequired,
};

SurveyHourItem.defaultProps = {
  swapGridTileSurvey: false,
};

export default SurveyHourItem;
