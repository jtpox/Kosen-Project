import Return from '../../return';

import Session from '../../models/session';

async function isLogged(req, res, next) {
  if (req.headers.authentication) {
    try {
      const sess = await Session.findOne({ token: req.headers.authentication })
        .populate('user', '-password');
      if (sess) {
        req.currentUser = sess.user;
        next();
      } else {
        throw new Error('Authentication token invalid.');
      }
    } catch (err) {
      res.json(Return.error);
    }
  } else {
    res.json(Return.error);
  }
}

module.exports = { isLogged };
