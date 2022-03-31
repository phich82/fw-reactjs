import { Log } from '../services';

export const Logger = store => next => action => {
  Log.group(action.type);
  Log.info('[Prev State] => ', store.getState());
  Log.info('[Action] => ', action);
  let result = next(action);
  Log.info('[Current State] => ', store.getState());
  Log.groupEnd();
  return result;
};
