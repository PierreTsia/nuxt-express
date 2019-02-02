const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const myPassportService = require("../../passport")(passport);
const router = express.Router();
/*
//!* config
const keys = require("./../../../config/keys");*/

// Load Profile Model
const User = require("../../../models/User");
const Profile = require("../../../models/Profile");

/*
//!* Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");*/





//**ROUTES

// ? @route GET to api/profiles/test
// ? @description Test profiles route
// ! @ access Public

router.get("/test", (req, res) =>
  res.json({ message: "api/profiles route works fine 🖖" })
);




// ? @route GET to api/profiles/current
// ? @description Test profiles route
// ! @ access Restricted
router.get("/current", (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {

    if (err) {
      return next(err);
    }
    const errors = {}
    if (!user) {
      return res.json({ user: false });
    } else {

      const userId = user.id;
      console.log(userId)

      Profile.findOne({user: userId})
        .then(profile => {
          console.log(profile)
          if(!profile){
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
          }
          res.json(profile)
        })
        .catch(e => res.status(404).json(e))

    }
  })(req, res, next);
});


module.exports = router;
