const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  var baseUrl = 'src';
  return alias({
    '@components': `${baseUrl}/components`,
    "@config": `${baseUrl}/config`,
    "@hooks": `${baseUrl}/hooks`,
    "@locales": `${baseUrl}/locales`,
    "@middlewares": `${baseUrl}/middlewares`,
    "@modules": `${baseUrl}/modules`,
    "@services": `${baseUrl}/services`,
    "@redux": `${baseUrl}/redux`,
    "@routes": `${baseUrl}/routes`,
    "@stores": `${baseUrl}/stores`,
    "@utils": `${baseUrl}/utils`,
    "@shared": `${baseUrl}/modules/shared`,
    "@bootstrap": `${baseUrl}/bootstrap`,
    "@validations": `${baseUrl}/bootstrap/validations`,
    "@ui": `${baseUrl}/components/ui`,
    "@mockup": `${baseUrl}/.mockup`,
  })(config);

  // return config;
};
