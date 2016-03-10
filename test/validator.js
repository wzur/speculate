var validator = require('../lib/validator');
var assert = require('assert');
var path = require('path');

describe('validator', function () {
  it('returns true with there is a valid package.json in the working directory', function () {
    var isValid = validator(path.resolve(__dirname, './fixtures/project-with-package-json'));

    assert.strictEqual(isValid, true);
  });

  it('returns false with there is no package.json in the working directory', function () {
    var isValid = validator(path.resolve(__dirname, './fixtures/project-without-package-json'));

    assert.strictEqual(isValid, false);
  });

  it('returns false with there is no valid package.json in the working directory', function () {
    var isValid = validator(path.resolve(__dirname, './fixtures/project-with-invalid-package-json'));

    assert.strictEqual(isValid, false);
  });
});
