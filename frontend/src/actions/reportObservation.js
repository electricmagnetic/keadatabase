import { RSAA } from 'redux-api-middleware';

import { formatObservation } from './helpers/formatObservation';

export const REPORT_SIGHTING_OPTIONS_REQUEST = 'reportObservation/options/REQUEST';
export const REPORT_SIGHTING_OPTIONS_RECEIVE = 'reportObservation/options/RECEIVE';
export const REPORT_SIGHTING_OPTIONS_ERROR = 'reportObservation/options/ERROR';

export function getReportObservationOptions() {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_API_BASE}/report/observation/`,
      method: 'OPTIONS',
      headers: { Accept: 'application/json' },
      types: [
        REPORT_SIGHTING_OPTIONS_REQUEST,
        REPORT_SIGHTING_OPTIONS_RECEIVE,
        REPORT_SIGHTING_OPTIONS_ERROR,
      ],
    },
  };
}

export const REPORT_SIGHTING_POST_REQUEST = 'reportObservation/post/REQUEST';
export const REPORT_SIGHTING_POST_RECEIVE = 'reportObservation/post/RECEIVE';
export const REPORT_SIGHTING_POST_ERROR = 'reportObservation/post/ERROR';

export function postReportObservation(values, formikBag) {
  // Returning thunk to dispatch multiple actions
  return async (dispatch, getState) => {
    const response = await dispatch({
      [RSAA]: {
        endpoint: `${process.env.REACT_APP_API_BASE}/report/observation/`,
        method: 'POST',
        body: formatObservation(values),
        types: [
          REPORT_SIGHTING_POST_REQUEST,
          REPORT_SIGHTING_POST_RECEIVE,
          REPORT_SIGHTING_POST_ERROR,
        ],
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    });
    formikBag.setSubmitting(false);

    // Use response to dispatch further actions
    if (response.error) {
      // Receiving error doesn't dispatch REPORT_SIGHTING_POST_ERROR somehow so dispatch it here
      dispatch({ type: REPORT_SIGHTING_POST_ERROR, payload: response.payload });

      const errors = response.payload.response;
      // Convert point_location validation message to formik parameters
      // Show the error message to both fields as you can't tell which was wrong
      if (errors.point_location && errors.point_location[0]) {
        errors.longitude = errors.point_location[0];
        errors.latitude = errors.point_location[0];
      }
      formikBag.setErrors(errors);
    } else {
      const id = response.payload.id || '';
      formikBag.history.push(`/report/success/${id}`);
    }
    return response;
  };
}
