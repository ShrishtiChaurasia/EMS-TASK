const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");

router.post(
  "/signup",
  WrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;

      let newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);

      console.log(registeredUser);

      res.status(201).json({ message: "User added successfully!" });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ error: "Something went wrong. Try again later." });
    }
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome!");
    res.redirect("/");
  }
);

module.exports = router;
