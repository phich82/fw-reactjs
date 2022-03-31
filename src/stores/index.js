import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // localStorage
// import storageSession from 'redux-persist/lib/storage/session'; // sessionStorage

import rootReducer from './reducers';
import { middlewares } from '../middlewares';
import { migrations } from './migrations';
import { ENV } from '../config';

const persistConfig = {
  key: 'root',
  storage: storage, // localStorage
  whitelist: ['appReducers'], // which state you want to persist
  debug: ENV.DEBUG,
  version: 0,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: ENV.DEBUG }),
};

const reducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(reducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
