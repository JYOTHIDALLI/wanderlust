const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description:  String,
  image:{
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String, 
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

// Optional: Add a virtual for image thumbnail (Cloudinary-style)
listingSchema.virtual("image.thumbnail").get(function () {
  if (!this.image.url) return ""; // prevent errors
  return this.image.url.replace("/upload", "/upload/w_300");
});

listingSchema.set("toObject", { virtuals: true });
listingSchema.set("toJSON", { virtuals: true });

// Cascade delete reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
