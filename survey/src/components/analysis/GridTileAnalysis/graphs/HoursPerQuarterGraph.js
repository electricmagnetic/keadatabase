import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ResponsiveContainer, BarChart, XAxis, Bar, Tooltip } from 'recharts';

import { calculateHoursWithoutKea } from '../calculations/gridTileCalculations';

/**
  Displays a bar chart showing hours with/without kea per quarter
*/
const HoursPerQuarterGraph = ({ gridTileAnalysis }) => {
  const hoursSurveyedPerQuarter = gridTileAnalysis.hours_per_quarter.map(hourSet =>
    Object.assign({}, hourSet, { without_kea: calculateHoursWithoutKea(hourSet) })
  );

  const commonBarAttributes = {
    stackId: 'common',
    maxBarSize: 25,
    barGap: 5,
  };

  return (
    <ResponsiveContainer width="100%" height={128}>
      <BarChart data={hoursSurveyedPerQuarter}>
        <XAxis dataKey="quarter" tickFormatter={quarter => moment(quarter).format('MMM-YY')} />
        <Tooltip
          labelFormatter={quarter => moment(quarter).format('MMMM YYYY')}
          formatter={value => `${value} h`}
        />
        <Bar dataKey="without_kea" name="No kea" fill="#dfd4ba" {...commonBarAttributes} />
        <Bar dataKey="with_kea" name="Kea" fill="#df5206" {...commonBarAttributes} />
      </BarChart>
    </ResponsiveContainer>
  );
};

HoursPerQuarterGraph.propTypes = {
  gridTileAnalysis: PropTypes.object.isRequired,
};

export default HoursPerQuarterGraph;
