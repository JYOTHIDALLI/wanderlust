const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

// INDEX - Show all listings
router.get("/", wrapAsync(async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index", { listings });
}));

router.get("/new",wrapAsync(async(re, res) => {
  res.render("listings/new") ;
}));

// SHOW - Show a single listing
router.get("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
}));


// CREATE - Add a new listing
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id;
  await listing.save();
  req.flash("success", "Listing Created");
  res.redirect(`/listings/${listing._id}`);

}));


// EDIT - Show the edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
}));

/// UPDATE - Update a listing
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${listing._id}`);

}));
// DELETE - Delete a listing
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
}));

module.exports = router;
