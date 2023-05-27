import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import Survey from './Survey';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `${process.env.REACT_APP_API_BASE}/surveys/surveys/`;

const Surveys = ({ queryString, ...others }) => {
  const { data, error, isValidating } = useSWR(`${API_URL}${queryString}`, { dedupingInterval: 0 });

  if (isValidating) {
    return <Loader />;
  } else if (error) {
    return <Error message="Error fetching surveys" />;
  } else if (data) {
    const surveys = data.results;

    return surveys.map(survey => <Survey survey={survey} key={survey.id} {...others} />);
  } else return null;
};

Surveys.propTypes = {
  type: PropTypes.string.isRequired,
  queryString: PropTypes.string,
};

Surveys.defaultProps = {
  type: 'item',
  queryString: '',
};

export default Surveys;
