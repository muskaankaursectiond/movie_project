module.exports = {
  ensureLoggedIn: (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    next();
  },

  ensureOwner: (modelUserId, sessionUserId) => {
    if (!modelUserId || !sessionUserId) return false;
    return modelUserId.toString() === sessionUserId.toString();
  }
};
