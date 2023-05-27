import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import SurveyHour from './SurveyHour';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/hours/`;

const SurveyHours = ({ queryString, ...others }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}${queryString}`, { dedupingInterval: 0 });

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error fetching survey hours" />;
  } else if (data) {
    const surveyHours = data.results;

    if (surveyHours.length > 0) {
      return surveyHours.map(surveyHour => (
        <SurveyHour surveyHour={surveyHour} key={surveyHour.id} {...others} />
      ));
    } else return <Error message="No hours found" info />;
  } else return null;
};

SurveyHours.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

SurveyHours.defaultProps = {
  type: 'item',
  queryString: '',
};

export default SurveyHours;
