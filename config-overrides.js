const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  var baseUrl = 'src';
  alias({
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
    "@utils": `${baseUrl}/services`,
    "@shared": `${baseUrl}/modules/shared`,
    "@mockup": `${baseUrl}/.mockup`,
    "@validations": `${baseUrl}/validations`,
  })(config);

  return config;
};
