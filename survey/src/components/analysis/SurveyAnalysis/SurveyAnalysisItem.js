import React from 'react';
import PropTypes from 'prop-types';

import { calculateEncounterRate } from './calculations/surveyCalculations';

/**
  Display analyses as an item
 */
const SurveyAnalysisItem = ({ surveyAnalysis }) => {
  const encounterRate = calculateEncounterRate(surveyAnalysis);

  return (
    <div className="SurveyAnalysisItem">
      <dl>
        <div className="row">
          <div className="col-md-2">
            <dt>Hours with kea</dt>
            <dd>{surveyAnalysis.hours_total.with_kea}</dd>
          </div>
          <div className="col-md-2">
            <dt>Hours surveyed</dt>
            <dd>{surveyAnalysis.hours_total.surveyed}</dd>
          </div>
          <div className="col-md-2">
            <dt>Encounter rate</dt>
            <dd>{encounterRate}%</dd>
          </div>
        </div>
      </dl>
    </div>
  );
};

SurveyAnalysisItem.propTypes = {
  surveyAnalysis: PropTypes.object.isRequired,
};

export default SurveyAnalysisItem;
