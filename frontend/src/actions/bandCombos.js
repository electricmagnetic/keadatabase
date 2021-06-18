import { RSAA } from 'redux-api-middleware';

export const BANDCOMBOS_REQUEST = 'bandCombos/REQUEST';
export const BANDCOMBOS_RECEIVE = 'bandCombos/RECEIVE';
export const BANDCOMBOS_ERROR = 'bandCombos/ERROR';

function fetchBandCombos(query) {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_API_BASE}/band_combos/?${query}`,
      method: 'GET',
      headers: { Accept: 'application/json' },
      types: [BANDCOMBOS_REQUEST, BANDCOMBOS_RECEIVE, BANDCOMBOS_ERROR],
    },
  };
}

function shouldFetchBandCombos(state) {
  // TODO: optimise
  return true;
}

export default function getBandCombos(query = '') {
  return (dispatch, getState) => {
    if (shouldFetchBandCombos(getState())) {
      return dispatch(fetchBandCombos(query));
    }
  };
}
