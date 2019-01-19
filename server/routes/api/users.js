const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../../../models/User");

const validateRegisterInput = require("../../validation/register");


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
      /* const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default
      }); */

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        // avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          console.log(hash)
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



module.exports = router