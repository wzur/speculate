var fs = require('fs');

var archiver = require('./archiver');
var createServiceFile = require('./service');
var createSpecFile = require('./spec');
var files = require('./files');

function generateServiceFile(root, pkg) {
  var serviceFileContents = createServiceFile(pkg);
  var serviceFilePath = files.serviceFile(root, pkg);

  fs.writeFileSync(serviceFilePath, serviceFileContents);
}

function generateSpecFile(root, pkg) {
  var specFileContents = createSpecFile(pkg);
  var specFilePath = files.specFile(root, pkg);

  fs.writeFileSync(specFilePath, specFileContents);
}

module.exports = function (root, pkg, cb) {
  var specsDirectory = files.specsDirectory(root);
  var sourcesDirectory = files.sourcesDirectory(root);
  var sourcesArchive = files.sourcesArchive(root, pkg);

  fs.mkdirSync(specsDirectory);
  fs.mkdirSync(sourcesDirectory);
  generateServiceFile(root, pkg);
  generateSpecFile(specsDirectory, pkg);

  archiver.compress(root, sourcesArchive, cb);
};
