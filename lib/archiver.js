var _ = require('lodash');
var tar = require('tar-fs');
var fs = require('fs');
var zlib = require('zlib');
var path = require('path');

var IGNORE_REGEX = /SOURCES|SPECS|RPMS|SRPMS|\.git/;
var REQUIRED_ENTRIES = [
  'package.json',
  'node_modules'
];

function getEntries(whitelist) {
  if (!whitelist.files && !whitelist.main) {
    return;
  }

  if (whitelist.main && whitelist.files) {
    return _.concat(REQUIRED_ENTRIES, whitelist.files, whitelist.main);
  }

  if (whitelist.main) {
    return _.concat(REQUIRED_ENTRIES, whitelist.main);
  }

  return _.concat(REQUIRED_ENTRIES, whitelist.files);
}

module.exports.compress = function (source, target, whitelist, cb) {
  var gzip = zlib.createGzip();
  var ws = fs.createWriteStream(target);
  var rs = tar.pack(source, {
    ignore: function (name) {
      return IGNORE_REGEX.test(path.relative(source, name));
    },
    entries: getEntries(whitelist)
  });

  rs.on('error', cb);
  ws.on('error', cb);
  ws.on('close', cb);

  rs.pipe(gzip).pipe(ws);
};
