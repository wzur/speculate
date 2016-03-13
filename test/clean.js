var sinon = require('sinon');
var rimraf = require('rimraf');
var clean = require('../lib/clean');

var pkg = require('./fixtures/my-cool-api');
var sandbox = sinon.sandbox.create();

describe('clean', function () {
  beforeEach(function () {
    sandbox.stub(rimraf, 'sync');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('removes the existing service file', function () {
    clean('/path/to/project', pkg);
    sinon.assert.calledWith(
      rimraf.sync,
      '/path/to/project/my-cool-api.service'
    );
  });

  it('removes the SPECS directory', function () {
    clean('/path/to/project', pkg);
    sinon.assert.calledWith(
      rimraf.sync,
      '/path/to/project/SPECS'
    );
  });

  it('removes the SOURCES directory', function () {
    clean('/path/to/project', pkg);
    sinon.assert.calledWith(
      rimraf.sync,
      '/path/to/project/SOURCES'
    );
  });
});
