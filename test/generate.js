var sinon = require('sinon');
var fs = require('fs');
var assert = require('assert');
var generate = require('../lib/generate');
var archiver = require('../lib/archiver');

var pkg = require('./fixtures/my-cool-api');
var sandbox = sinon.sandbox.create();

describe('generate', function () {
  beforeEach(function () {
    sandbox.stub(fs, 'writeFileSync');
    sandbox.stub(fs, 'mkdirSync');
    sandbox.stub(archiver, 'compress').yields();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('creates the service file', function (done) {
    generate('/path/to/project', pkg, null, null, function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(
        fs.writeFileSync,
        '/path/to/project/my-cool-api.service',
        sinon.match('SyslogIdentifier=my-cool-api')
      );
      done();
    });
  });

  it('creates directory for SPECS', function (done) {
    generate('/path/to/project', pkg, null, null, function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(fs.mkdirSync, '/path/to/project/SPECS');
      done();
    });
  });

  it('creates the spec file', function (done) {
    generate('/path/to/project', pkg, null, null, function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(
        fs.writeFileSync,
        '/path/to/project/SPECS/my-cool-api.spec',
        sinon.match('%define name my-cool-api')
      );
      done();
    });
  });

  it('creates directory for SOURCES', function (done) {
    generate('/path/to/project', pkg, null, null, function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(fs.mkdirSync, '/path/to/project/SOURCES');
      done();
    });
  });

  it('creates the sources archive', function (done) {
    generate('/path/to/project', pkg, null, null, function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(
        archiver.compress,
        '/path/to/project',
        '/path/to/project/SOURCES/my-cool-api.tar.gz'
      );
      done();
    });
  });

  it('creates the spec file with the correct release number', function (done) {
    generate('/path/to/project', pkg, 7, null, function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(
        fs.writeFileSync,
        '/path/to/project/SPECS/my-cool-api.spec',
        sinon.match('%define release 7')
      );
      done();
    });
  });

  it('creates the spec file with a custom name if specified', function (done) {
    generate('/path/to/project', pkg, 1, 'penguin', function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(
        fs.writeFileSync,
        '/path/to/project/SPECS/penguin.spec',
        sinon.match('%define name penguin')
      );
      done();
    });
  });

  it('creates the service file with a custom name if specified', function (done) {
    generate('/path/to/project', pkg, 1, 'penguin', function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(
        fs.writeFileSync,
        '/path/to/project/penguin.service',
        sinon.match('SyslogIdentifier=penguin')
      );
      done();
    });
  });

  it('creates the sources archive with a custom name if specified', function (done) {
    generate('/path/to/project', pkg, null, 'penguin', function (err) {
      assert.ifError(err);
      sinon.assert.calledWith(
        archiver.compress,
        '/path/to/project',
        '/path/to/project/SOURCES/penguin.tar.gz'
      );
      done();
    });
  });

  it('returns an array of files created', function (done) {
    var filesExpected = ['SPECS/my-cool-api.spec', 'SOURCES/my-cool-api.tar.gz', 'my-cool-api.service'];
    generate('/path/to/project', pkg, null, null, function (err, files) {
      assert.ifError(err);
      assert.deepEqual(files, filesExpected);
      done();
    });
  });
});
