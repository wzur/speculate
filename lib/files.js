'use strict';

const path = require('path');

module.exports = {
  serviceFile: function (root, pkg) {
    return path.resolve(root, packageFileName(pkg) + '.service');
  },
  specsDirectory: function (root) {
    return path.resolve(root, 'SPECS');
  },
  specFile: function (root, pkg) {
    return path.resolve(root, packageFileName(pkg) + '.spec');
  },
  sourcesDirectory: function (root) {
    return path.resolve(root, 'SOURCES');
  },
  sourcesArchive: function (root, pkg) {
    const sourcesDirectory = this.sourcesDirectory(root);

    return path.resolve(sourcesDirectory, packageFileName(pkg) + '.tar.gz');
  },
  packageFileName: packageFileName
};

function packageFileName (pkg) {
    return pkg.name[0] === '@'
        // scoped packages get special treatment
        ? pkg.name.substr(1).replace(/\//g, '-')
        : pkg.name;
}
