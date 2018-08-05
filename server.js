// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
const restaurant = [
  {
    routeName: "alex",
    name: "Alex",
    phone: "###-###-####",
    email: "test@gmail.com",
    uniqueID: 1
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

// Displays all characters
app.get("/api/restaurant", function(req, res) {
  return res.json(restaurant);
});

app.post("/api/restaurant", function(req, res) {
  var newreservation = req.body;
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  console.log(newreservation);
  restaurant.push(newreservation);
  res.json(newreservation);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


// if (restaurant.length >= 4) {
//   restaurant.splice(0,4);
//   let newWait = newreservation.splice(0,4);
//   waitlist.push(newWait);
//  }