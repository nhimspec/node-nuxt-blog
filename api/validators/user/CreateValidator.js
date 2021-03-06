const { check, validationResult } = require('express-validator/check');
const User = require('./../../models/User');

module.exports = [
  [
    check('name')
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 20 }),
    check('username')
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 20 })
      .custom(value =>
        User.findOne({ username: value }).then(user => {
          if (user) {
            return Promise.reject('Username already in use');
          }
        })
      ),
    check('email')
      .exists()
      .isEmail()
      .custom(value =>
        User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        })
      ),
    check('password')
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 20 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res
      .status(422)
      .json({ errors: errors.array({ onlyFirstError: true }) });
  }
];
