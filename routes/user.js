const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// GET signup form
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// POST signup

router.post("/signup", wrapAsync(async (req, res) => {
  let { username, email, password } = req.body;
  console.log("Signup details:", username, email);  // Debug the signup data

  const newUser = new User({ email, username });

  try {
      const registeredUser = await User.register(newUser, password);
      console.log("Registered user:", registeredUser);  // Log the user after registration
      
      req.login(registeredUser, (err) => {
          if (err) {
              console.log("Login error:", err);
              req.flash("error", "Login failed");
              return res.redirect("/signup");
          }
          req.flash("success", "Welcome to Wanderlust!");
          res.redirect("/listings");
      });
  } catch (e) {
      console.log("Signup error:", e.message);  // Debug error during registration
      req.flash("error", e.message);
      res.redirect("/signup");
  }
}));  // <-- Ensure you close this with a closing parenthesis and bracket


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
    async (req, res) => {
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
