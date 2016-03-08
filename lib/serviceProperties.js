var truncate = require('./truncate');

module.exports = function (pkg) {
  return {
    name: pkg.name,
    username: truncate(pkg.name),
    description: pkg.description
  };
};
