//? Deberia manetener createStore o cambiar a configureStore
import { legacy_createStore as createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducer);
const persister = persistStore(store);

export { store, persister };
