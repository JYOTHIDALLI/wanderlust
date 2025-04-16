const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const Listing = require("../models/listing");


// Middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

// Index Route
router.get("/", wrapAsync(async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index", { allListings });
}));

// New Route
router.get("/new", (req, res) => {
  res.render("listings/new");
});


// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}));

// Create Route
router.post("/", validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success","New listing Created");
  res.redirect("/listings");
}));


// Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

// Update Route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","Listing Updated");
  res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","New Listing deleted");
  res.redirect("/listings");
}));

module.exports = router;
