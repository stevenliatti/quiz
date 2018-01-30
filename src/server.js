const Log = require("log");
const log = new Log("debug");
const express = require('express');
const app = express();

// route index
app.get("/", function(req, res) {

});

// route login
app.get("/login", function(req, res) {

});

// route logout
app.get("/logout", function(req, res) {

});

// route register
app.get("/register", function(req, res) {

});

// route new quiz
app.get("/newquiz", function(req, res) {

});

app.all("*", function(req, res) {
	log.error("Requested:", req.url);
	res.status(404).send("404 Page not found.");
});

app.listen(8080);
