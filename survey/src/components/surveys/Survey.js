import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import SurveyPage from './Survey/SurveyPage';
import SurveyItem from './Survey/SurveyItem';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/surveys/`;

/**
  FOO
*/
const RenderSurvey = ({ survey, type, ...others }) => {
  if (!survey) return <Error message="Invalid survey" />;

  switch (type) {
    case 'item':
      return <SurveyItem survey={survey} {...others} />;
    default:
      return <SurveyPage survey={survey} {...others} />;
  }
};

const Survey = ({ id, survey, ...others }) => {
  const { data, error, isValidating } = useSWR(id ? `${API_URL}${id}/` : null, {
    dedupingInterval: 0,
  });

  if (id) {
    if (isValidating) {
      return <Loader />;
    } else if (error) {
      return <Error message="Error fetching survey" />;
    } else if (data) {
      return <RenderSurvey survey={data} {...others} />;
    } else return null;
  } else if (survey) {
    return <RenderSurvey survey={survey} {...others} />;
  } else return null;
};

Survey.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  survey: PropTypes.object,
};

Survey.defaultProps = {
  type: 'page',
};

export default Survey;
