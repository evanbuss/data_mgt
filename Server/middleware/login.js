module.exports = function (req, res, next) {
  // check previous session
  if (req && req.session && req.session.user) {
    return next();
  }

  // throw the 401 code if user is not signed in
  res.redirect('/check-login');
};