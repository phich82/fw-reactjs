import { ENDPOINT } from '../config';
import { httpApi as http } from './Https';
import HTTP_CODE from './common/HttpCode';
import Log from './common/Log';

const Api = {};

const _validateFn = fn => {
  if (typeof fn !== 'function') {
    throw new Error('callback must be a function.');
  }
  return true;
};

/**
 * Build the query string
 *
 * @param json params
 * @param string prefix
 * @return string
 * @throws Error
 */
const _buildQueryString = (params, prefix = '?') => {
  if (typeof params !== 'object') {
    throw new Error('Parameters must be a json.');
  }
  return (
    prefix +
    Object.keys(params)
      .map(k => k + '=' + params[k])
      .join('&')
  );
};

/**
 * Build the url string w/wo query string
 *
 * @param string rootUrl
 * @param string|json queryString
 * @return string
 */
const _buildUrl = (rootUrl, queryString = '') => {
  return (
    rootUrl +
    (typeof queryString === 'object' ? _buildQueryString(queryString) : queryString)
  );
};

/**
 * Get the message string
 *
 * @param mixed message
 * @return string;
 */
const _getErrorMessage = message => {
  if (typeof message === 'string') {
    return message;
  }
  if (Array.isArray(message) && message.length > 0) {
    return _getErrorMessage(message[0]);
  }
  if (typeof message === 'object') {
    let keys = Object.keys(message);
    if (keys.length > 0) {
      return _getErrorMessage(message[keys[0]]);
    }
  }
  return '';
};

/**
 * Sign in
 *
 * @param json params
 * @param func callback
 * @param bool showSpinner
 * @return void
 */
Api.signIn = async (params, callback = () => {}, showSpinner = true) => {
  try {
    _validateFn(callback);

    const response = await http.post(ENDPOINT.SIGN_IN, params, { showSpinner });
    const { code, data, message } = response.data;
    const success = code === HTTP_CODE.OK;
      if (!success) {
        data = _getErrorMessage(message);
      }
      callback(success, data);
  } catch (err) {
    Log.warn('[ApiService.enableDisableReward][Error] => ', err);
    callback(false, _getErrorMessage(err));
  }
};

export default Api;
