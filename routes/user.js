const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const listingRouter = require("../routes/listing.js");
const { saveRedirectUrl } = require("../middleware.js");


// GET signup form
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// POST signup f
router.post("/signup", 
    wrapAsync(async (req, res) => {
      try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
  
        req.login(registeredUser, (err) => {
          if (err) return next(err);
          req.flash("success", "Welcome to Wanderlust!");
          res.redirect("/listings");
        });
  
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
  }));


// GET login form
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// POST login
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async(req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        const redirectUrl = req.session.returnTo || "/listings";
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    }
);

// GET logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You have successfully logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;
