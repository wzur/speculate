var generate = require('../lib/generate');
var sinon = require('sinon');
var fs = require('fs');

var sandbox = sinon.sandbox.create();

describe('generate', function () {
  beforeEach(function () {
    sandbox.stub(fs, 'writeFileSync');
    sandbox.stub(fs, 'mkdirSync');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('creates the service file', function () {
    var pkg = require('./fixtures/my-cool-api');

    generate('/path/to/project', pkg);

    sinon.assert.calledWith(
      fs.writeFileSync,
      '/path/to/project/my-cool-api.service',
      sinon.match('SyslogIdentifier=my-cool-api')
    );
  });

  it('creates directory for SPECS', function () {
    var pkg = require('./fixtures/my-cool-api');

    generate('/path/to/project', pkg);

    sinon.assert.calledWith(fs.mkdirSync, '/path/to/project/SPECS');
  });

  it('creates the spec file', function () {
    var pkg = require('./fixtures/my-cool-api');

    generate('/path/to/project', pkg);

    sinon.assert.calledWith(
      fs.writeFileSync,
      '/path/to/project/SPECS/my-cool-api.spec',
      sinon.match('%define name my-cool-api')
    );
  });
});
