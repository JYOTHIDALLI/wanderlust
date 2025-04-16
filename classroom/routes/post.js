const express = require("express");
const router = express.Router();

// Index route
router.get("/", (req, res) => {
    res.send("GET for posts");
});

// /posts/:id route (Show specific post)
router.get("/:id", (req, res) => {
    res.send(`GET for show /posts/${req.params.id}`);
});

// Create new post
router.post("/", (req, res) => {
    res.send("POST for posts");
});

// Delete post by ID
router.delete("/:id", (req, res) => {
    res.send(`DELETE for post with id ${req.params.id}`);
});

module.exports = router;
