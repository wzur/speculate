var fs = require('fs');
var rimraf = require('rimraf');

var files = require('./files');

module.exports = function (root, pkg) {
  var serviceFilePath = files.serviceFile(root, pkg);
  var specsDirectory = files.specsDirectory(root);
  var sourcesDirectory = files.sourcesDirectory(root);

  fs.unlinkSync(serviceFilePath);
  rimraf.sync(specsDirectory);
  rimraf.sync(sourcesDirectory);
};
