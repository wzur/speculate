#! /usr/bin/env node

var path = require('path');
var program = require('commander');

var validator = require('../lib/validator');
var generate = require('../lib/generate');
var clean = require('../lib/clean');
var commandPkg = require('../package');

var cwd = process.cwd();
var isValid = validator(cwd);

if (!isValid) {
  console.error('Please run speculate from within a valid Node.js project');
  process.exit(1);
}

var projectPkg = require(path.resolve(cwd, './package.json'));
var name = projectPkg.name;

program
  .version(commandPkg.version)
  .option('-r --release <release>', 'Specify release number of package')
  .option('-n --name <name>', 'Specify custom name for package')
  .parse(process.argv);

clean(cwd, projectPkg);
generate(cwd, projectPkg, program.release, program.name, function (err) {
  if (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }

  console.log('Created ./SPECS/%s.spec', name);
  console.log('Created ./SOURCES/%s.tar.gz', name);
  console.log('Created ./%s.service', name);
  process.exit(0);
});
