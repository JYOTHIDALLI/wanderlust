const express = require("express");
const router = express.Router();

// users route
router.get("/", (req, res) => {
    res.send("GET for users");
});

// /users/:id route (Show specific user)
router.get("/:id", (req, res) => {
    res.send(`GET for show /users/${req.params.id}`);
});

// Create new user
router.post("/", (req, res) => {
    res.send("POST for users");
});

// Delete user by ID
router.delete("/:id", (req, res) => {
    res.send(`DELETE for user with id ${req.params.id}`);
});

module.exports = router;
