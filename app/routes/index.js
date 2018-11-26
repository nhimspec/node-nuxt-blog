const express = require('express');
const auth = require('./auth');
const user = require('./user');
const article = require('./article');

const authen = require('./../middleware/authen');
// Midlewares
const router = express.Router();
router.use('/auth', auth);
router.use('/user', user);
router.use('/article', authen, article);

// Catch error
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      msg: 'invalid token...'
    });
  }
});

module.exports = router;
