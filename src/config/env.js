const ENV_PREFIX = 'REACT_APP_';

export const ENV = {
  // Remove prefix (REACT_APP_) from environment variables
  ...Object.keys(process.env).reduce((carry, key) => {
    if (['NODE_ENV'].indexOf(key) !== -1) {
      carry[key] = process.env[key];
    } else if (new RegExp(`^${ENV_PREFIX}`).test(key)) {
      let KEY_WITHOUT_PREFIX = String(key).substring(ENV_PREFIX.length);
      carry[KEY_WITHOUT_PREFIX] = process.env[key];
    }
    return carry;
  }, {}),
  __DEV__: process.env.NODE_ENV === 'development',
};
