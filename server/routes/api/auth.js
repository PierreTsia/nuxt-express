const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require ("passport")
const myPassportService = require('../../passport')(passport);


const router = express.Router();


//* config
const keys = require("./../../../config/keys");

//*models
const User = require("../../../models/User");

//* Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");






// ? @route POST to api/users/login
// ? @description login user : returning JWT token
// ! @ access Public

router.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User match
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token
            });
          },
        );
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

// [GET] /user
router.get('/user', (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: info.message });
      }
      res.json({
        msg: "Auth success 👌",
        user,
      });
    })(req, res, next);
  });

// [POST] /logout
router.post('/logout', (req, res, next) => {
  res.json({ status: 'OK' })
})


module.exports = router

