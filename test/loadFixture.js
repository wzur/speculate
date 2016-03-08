var fs = require('fs');
var path = require('path');

module.exports = function loadFixture(fixtureName) {
  var fixtureFile = path.join(__dirname, './fixtures/', fixtureName);

  return fs.readFileSync(fixtureFile, 'utf-8');
};
