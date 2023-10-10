import { SET_VEHICLES } from './actions';

export const initialState = {
  vehicles: [],
  slots: 0
};

const vehiclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLES: {
      return {
        vehicles: action.payload,
        slots: action.payload.length
      };
    }
    default:
      return { ...state };
  }
};
export default vehiclesReducer;
