var fs = require('fs');
var path = require('path');

var createServiceFile = require('./service');
var createSpecFile = require('./spec');

function generateServiceFile(root, pkg) {
  var serviceFileContents = createServiceFile(pkg);
  var serviceFilePath = path.resolve(root, pkg.name + '.service');

  fs.writeFileSync(serviceFilePath, serviceFileContents);
}

function generateSpecFile(root, pkg) {
  var specFileContents = createSpecFile(pkg);
  var specFilePath = path.resolve(root, pkg.name + '.spec');

  fs.writeFileSync(specFilePath, specFileContents);
}

module.exports = function (root, pkg) {
  var specsDirectory = path.resolve(root, 'SPECS');

  fs.mkdirSync(specsDirectory);
  generateServiceFile(root, pkg);
  generateSpecFile(specsDirectory, pkg);
};
