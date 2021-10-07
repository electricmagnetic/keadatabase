import { combineReducers } from 'redux';

import { reportObservationOptions, reportObservationPost } from './reportObservation';

export default combineReducers({
  reportObservationOptions,
  reportObservationPost,
});
