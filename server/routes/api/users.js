const express = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
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





//**ROUTES


// ? @route GET to api/users/test
// ? @description Test users route
// ! @ access Public


router.get("/test", (req, res) => res.json({ message: "api/users route works fine 🖖" }));


// ? @route GET to api/users/register
// ? @description Register New User
//! @ access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json({ success: true, user }))
            .catch(err => console.log(err))
        });
      });
    }
  });
});


// ? @route GET to api/users/login
// ? @description login user : returning JWT token
// ! @ access Public


/*
// POST `/api/login` to log in the user and add him to the `req.session.authUser`
app.post('/api/login', function (req, res) {
  if (req.body.username === 'demo' && req.body.password === 'demo') {

    return res.json({ username: 'demo' })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST `/api/logout` to log out the user and remove it from the `req.session`
app.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})
*/






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
        const payload = { id: user.id, name: user.name, avatar: user.avatar, email: user.email };

        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              accessToken: token,
              user: payload,
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

router.post('/logout',  (req, res) =>{
  res.json({ success: true })
})


// ? @route GET to api/users/current
// ? @description Return Current User
// ! @access      Private

router.get("/current", (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    res.json({
      msg: "Auth success 👌",
      user: user.name,
      id: user.id,
      email: user.email,
    });
  })(req, res, next);
});


module.exports = router
