import thunk from 'redux-thunk';
import { Logger } from './logger';

export const middlewares = [
  Logger,
  thunk,
];
