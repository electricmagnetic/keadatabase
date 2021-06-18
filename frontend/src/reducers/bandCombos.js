import { BANDCOMBOS_REQUEST, BANDCOMBOS_RECEIVE, BANDCOMBOS_ERROR } from '../actions/bandCombos';

const initialState = {
  pending: false,
  rejected: false,
  fulfilled: false,
  value: {},
};

const bandCombos = (state = initialState, action) => {
  switch (action.type) {
    case BANDCOMBOS_REQUEST:
      return Object.assign({}, state, {
        pending: true,
        rejected: false,
        fulfilled: false,
      });
    case BANDCOMBOS_RECEIVE:
      return Object.assign({}, state, {
        pending: false,
        rejected: false,
        fulfilled: true,
        value: action.payload,
      });
    case BANDCOMBOS_ERROR:
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

export default bandCombos;
