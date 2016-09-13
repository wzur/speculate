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

function generateSpecFile(root, pkg, release) {
  var specFileContents = createSpecFile(pkg, release);
  var specFilePath = files.specFile(root, pkg);

  fs.writeFileSync(specFilePath, specFileContents);
}

function addCustomFieldsToPackage(pkg, customName) {
  if (customName) {
    return Object.assign({}, pkg, { name: customName });
  }

  return pkg;
}

module.exports = function (root, pkg, release, customName, cb) {

  var customPackage = addCustomFieldsToPackage(pkg, customName);
  var specsDirectory = files.specsDirectory(root);
  var sourcesDirectory = files.sourcesDirectory(root);
  var sourcesArchive = files.sourcesArchive(root, customPackage);

  fs.mkdirSync(specsDirectory);
  fs.mkdirSync(sourcesDirectory);
  generateServiceFile(root, customPackage);
  generateSpecFile(specsDirectory, customPackage, release);

  archiver.compress(root, sourcesArchive, cb);
};
