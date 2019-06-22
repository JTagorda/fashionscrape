var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT||3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Make public a static folder
app.use(express.static("public"));
// Controllers
const router = require("./controllers/api.js");
app.use(router);

// Connect to the Mongo DB
mongoose.Promise = Promise;
if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect("mongodb://heroku_94zlw63p:clq32q5mfhh7onv9jjs24gql4d@ds215172.mlab.com:15172/heroku_94zlw63p", { useNewUrlParser: true });

}

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});