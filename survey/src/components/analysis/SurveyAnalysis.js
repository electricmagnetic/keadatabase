import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import SurveyAnalysisItem from './SurveyAnalysis/SurveyAnalysisItem';

const API_URL = `${process.env.REACT_APP_API_BASE}/analysis/surveys/`;

/**
  Obtain analyses for a given survey
 */
const SurveyAnalysis = ({ id }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}${id}/`, { dedupingInterval: 0 });

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error fetching analyses" />;
  } else if (data) {
    return <SurveyAnalysisItem surveyAnalysis={data} />;
  } else return null;
};

SurveyAnalysis.propTypes = {
  id: PropTypes.number.isRequired,
};

export default SurveyAnalysis;
