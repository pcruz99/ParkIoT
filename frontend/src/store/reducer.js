import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import vehiclesReducer from './vehiclesReducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  account: persistReducer(
    {
      key: 'account',
      storage,
      keyPrefix: 'berry-'
    },
    accountReducer
  ),
  customization: customizationReducer,
  vehicles: vehiclesReducer
});

export default reducer;
