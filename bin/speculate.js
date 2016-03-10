#! /usr/bin/env node

var path = require('path');
var validator = require('../lib/validator');
var generate = require('../lib/generate');
var clean = require('../lib/clean');
var cwd = process.cwd();

var isValid = validator(cwd);

if (!isValid) {
  console.error('Please run speculate from within a valid Node.js project');
  process.exit(1);
}

var pkg = require(path.resolve(cwd, './package.json'));

clean(cwd, pkg);
generate(cwd, pkg, function (err) {
  console.log('hai guiz');

  if (err) {
    throw err;
  }

  process.exit(0);
});
