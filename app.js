var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

var movie;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/search", (req, res) => {
    movie = req.body.movieName;
    // console.log(movie);
    res.redirect("/results");
});

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/results", (req, res) => {
    request("http://www.omdbapi.com/?s=" + movie + "&apikey=thewdb", (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", { data: data });
            // res.send(data.Search[0].Title);
        }
    });
});

app.listen(3000, (req, res) => {
    console.log("Movie app has started!!!");
});