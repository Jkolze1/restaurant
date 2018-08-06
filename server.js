const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Array pool for tables + waitlist
const reservations = [];

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/all", (req, res) => {
  res.sendFile(path.join(__dirname, "all.html"));
});

app.post("/reservation", (req, res) => {
  let reservation = req.body;
  reservations.push(reservation);
  if (reservations.length <= 5){
      res.send(true);
  }
  else {
      res.send(false);
  }
});

app.get ("/tables", (req, res) => {
  // Array for 5 available tables
  const tables = [];
  for (let i = 0; i < 5 && i < reservations.length; i++) {
      tables.push(reservations[i]);
  }
  res.json(tables);
});

app.get("/waitlist", (req,res) => {
  // Array for waitlist
  const waitlist = [];
  for(let i = 5; i < reservations.length; i++) {
      waitlist.push(reservations[i]);
  }
  res.json(waitlist);
});

app.post("/clear", (req,res) => {
  console.log("clearing");
  reservations = [];
});

// Listener
app.listen(PORT, () => {
  console.log("App listening on PORT" + PORT);
});