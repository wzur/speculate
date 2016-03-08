var createServiceFile = require('../lib/service');
var assert = require('assert');
var loadFixture = require('./loadFixture');

describe('service', function () {
  it('creates a service file from a package.json', function () {
    var pkg = require('./fixtures/my-cool-api');
    var expected = loadFixture('my-cool-api.service');
    var service = createServiceFile(pkg);

    assert.equal(service, expected);
  });

  it('truncates the service name if over the Linux username character limit', function () {
    var pkg = require('./fixtures/my-super-long-long-long-long-cat-api');
    var expected = loadFixture('my-super-long-long-long-long-cat-api.service');
    var service = createServiceFile(pkg);

    assert.equal(service, expected);
  });
});
