const signup = require('./signup');
const verify = require('./verify');
const resendEmail = require('./resendEmail');
const login = require("./login");
const getCurrentUser = require('./getCurrentUser.js');
const logOut = require('./logOut');
const updateAvatar = require('./updateAvatar');

module.exports = {
  signup,
  verify,
  resendEmail,
  login,
  getCurrentUser,
  logOut,
  updateAvatar
}