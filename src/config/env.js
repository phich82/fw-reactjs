export const ENV = {
  ...process.env,
  __DEV__: process.env.NODE_ENV === 'development',
};
