import {
  REPORT_SIGHTING_OPTIONS_REQUEST,
  REPORT_SIGHTING_OPTIONS_RECEIVE,
  REPORT_SIGHTING_OPTIONS_ERROR,
  REPORT_SIGHTING_POST_REQUEST,
  REPORT_SIGHTING_POST_RECEIVE,
  REPORT_SIGHTING_POST_ERROR,
} from '../actions/reportObservation';

const initialState = {
  pending: false,
  rejected: false,
  fulfilled: false,
  value: {},
};

export const reportObservationOptions = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_SIGHTING_OPTIONS_REQUEST:
      return Object.assign({}, state, {
        pending: true,
        rejected: false,
        fulfilled: false,
      });
    case REPORT_SIGHTING_OPTIONS_RECEIVE:
      return Object.assign({}, state, {
        pending: false,
        rejected: false,
        fulfilled: true,
        value: action.payload,
      });
    case REPORT_SIGHTING_OPTIONS_ERROR:
      return Object.assign({}, state, {
        pending: false,
        rejected: true,
        fulfilled: false,
        value: action.payload,
      });
    default:
      return state;
  }
};

export const reportObservationPost = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_SIGHTING_POST_REQUEST:
      return Object.assign({}, state, {
        pending: true,
        rejected: false,
        fulfilled: false,
      });
    case REPORT_SIGHTING_POST_RECEIVE:
      return Object.assign({}, state, {
        pending: false,
        rejected: false,
        fulfilled: true,
        value: action.payload,
      });
    case REPORT_SIGHTING_POST_ERROR:
      return Object.assign({}, state, {
        pending: false,
        rejected: true,
        fulfilled: false,
        value: action.payload,
      });
    default:
      return state;
  }
};
