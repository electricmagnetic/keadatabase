import React from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

import SurveyHourItem from './SurveyHour/SurveyHourItem';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/hours/`;

/**
  FOO
*/
const RenderSurveyHour = ({ surveyHour, type, ...others }) => {
  if (!surveyHour) return <Error message="Invalid survey hour" />;

  switch (type) {
    default:
      return <SurveyHourItem surveyHour={surveyHour} {...others} />;
  }
};

/**
  FOO
*/
const SurveyHour = ({ id, surveyHour, ...others }) => {
  const { data, error, isValidating } = useSWR(id ? `${API_URL}${id}/` : null, {
    dedupingInterval: 0,
  });

  if (id) {
    if (isValidating) {
      return <Loader />;
    } else if (error) {
      return <Error message="Error fetching survey hour" />;
    } else if (data) {
      return <RenderSurveyHour surveyHour={data} {...others} />;
    } else return null;
  } else if (surveyHour) {
    return <RenderSurveyHour surveyHour={surveyHour} {...others} />;
  } else return null;
};

SurveyHour.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  surveyHour: PropTypes.object,
};

SurveyHour.defaultProps = {
  type: 'item',
};

export default SurveyHour;
