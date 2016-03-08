var linuxUsernameLimit = 32;

module.exports = function (name) {
  return name.substring(0, linuxUsernameLimit);
};
