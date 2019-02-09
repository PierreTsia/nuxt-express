const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const myPassportService = require("../../passport")(passport);
const router = express.Router();
const cookieparser =  require("cookieparser")
/*
//!* config
const keys = require("./../../../config/keys");*/

// Load Profile Model
const User = require("../../../models/User");
const Profile = require("../../../models/Profile");


//!* Validation
const ValidateProfileInput = require("../../validation/profile");
const profilesEqualityCheck = require("../../helpers/index");





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

      Profile.findOne({user: userId})
        .then(profile => {
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

/*
*
*
*
* passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body)
    const { errors, isValid } = ValidateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;



    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        console.log('updating')
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  },*/

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  (req, res, next) => {
    console.log(req.headers)
    passport.authenticate("jwt", async (err, user, info) => {

      if (err) {
        return next(err);
      }
      const errors = {};

      if (!user) {
        errors.user = "user not found"
        return res.status(400).json(errors);
      } else {
        console.log('pouet', user)
        console.log(req.body)

        const {errors, isValid} = ValidateProfileInput(req.body);
        console.log("errors", errors)
        console.log("isValid", isValid)
        // Check Validation
        if (!isValid) {
          // Return any errors with 400 status
          return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.body.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.dob) profileFields.dob = req.body.dob


        const userProfile = await Profile.findOne({user: user.id})
        if(userProfile){

          if(profileFields.handle) {
            const profileByHandle = await Profile.findOne({handle: profileFields.handle})
            if(profileByHandle){
              if (!profilesEqualityCheck(profileByHandle, userProfile)) {
                errors.handle = "That handle already exists";
                return res.status(400).json(errors);
              }
            }

          }
          // Update
          Profile.findOneAndUpdate(
            { user: user.id },
            { $set: profileFields },
            { new: true },
          ).then(profile => res.json(profile));
        } else {
          //Create new Profile
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }

            // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          });
        }

      }
    })(req, res, next);

  });


module.exports = router;
