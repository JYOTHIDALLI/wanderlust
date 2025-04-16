const express = require("express");
const session = require("express-session");


const users = require("./routes/user.js");
const path = require("path");
const flash = require("connect-flash");

const app = express(); // moved above any usage

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: false
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if (name === "anonymous") {
        req.flash("error", "user not registered");
    } else {
        req.flash("success", "registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.render("page.ejs", { name: req.session.name });
});

// app.get("/reqcount", (req, res) => {
//     req.session.count = (req.session.count || 0) + 1;
//     res.send(`you have viewed this page ${req.session.count} times`);
// });

app.listen(3000, () => {
    console.log("server is listening to 3000");
});
