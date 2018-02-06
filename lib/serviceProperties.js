var truncate = require('./truncate');
var _ = require('lodash');
var files = require('./files');

function getEnvironment(pkg) {
  var environment = _.get(pkg, 'spec.environment', {});
  return Object.keys(environment).map(function(key) {
    return { key: key, value: environment[key]};
  });
}

function getServiceOptions(pkg) {
  var serviceOptions = _.get(pkg, 'spec.serviceOptions', {});
  return Object.keys(serviceOptions).map(function(key) {
    return { key: key, value: serviceOptions[key]};
  });
}

module.exports = function (pkg) {
  return {
    name: files.packageFileName(pkg),
    username: truncate(files.packageFileName(pkg)),
    description: pkg.description,
    environment: getEnvironment(pkg),
    serviceOptions: getServiceOptions(pkg)
  };
};
