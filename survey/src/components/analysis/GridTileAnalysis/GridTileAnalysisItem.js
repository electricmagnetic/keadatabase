import React from 'react';
import PropTypes from 'prop-types';

import { calculateEncounterRate } from './calculations/gridTileCalculations';
import HoursPerQuarterGraph from './graphs/HoursPerQuarterGraph';

/**
  Display analyses as an item
 */
const GridTileAnalysisItem = ({ gridTileAnalysis }) => {
  return (
    <div className="GridTileAnalysisItem">
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <dl>
            <dt>Hours with kea</dt>
            <dd>{gridTileAnalysis.hours_total.with_kea}</dd>
            <dt>Total hours</dt>
            <dd>{gridTileAnalysis.hours_total.total}</dd>
            <dt>Encounter rate</dt>
            <dd>{calculateEncounterRate(gridTileAnalysis)}%</dd>
          </dl>
        </div>
        <div className="col-sm-6 col-md-8">
          <dl>
            <dt>Quarterly breakdown</dt>
            <dd>
              <HoursPerQuarterGraph gridTileAnalysis={gridTileAnalysis} />
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

GridTileAnalysisItem.propTypes = {
  gridTileAnalysis: PropTypes.object.isRequired,
};

export default GridTileAnalysisItem;
