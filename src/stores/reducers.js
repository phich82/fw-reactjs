import { combineReducers } from 'redux';
import appReducers, { modalReducer } from '../redux';

export default combineReducers({
  appReducers,
  modalReducer,
});
