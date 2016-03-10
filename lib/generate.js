var fs = require('fs');
var path = require('path');

var archiver = require('./archiver');
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

module.exports = function (root, pkg, cb) {
  var specsDirectory = path.resolve(root, 'SPECS');
  var sourcesDirectory = path.resolve(root, 'SOURCES');
  var sourceArchive = path.resolve(sourcesDirectory, pkg.name + '.tar.gz');

  fs.mkdirSync(specsDirectory);
  fs.mkdirSync(sourcesDirectory);
  generateServiceFile(root, pkg);
  generateSpecFile(specsDirectory, pkg);

  archiver.compress(root, sourceArchive, cb);
};
