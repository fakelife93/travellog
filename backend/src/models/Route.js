const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  travelsName: String,
  from: String,
  to: String,
  defaultFare: Number,
});

module.exports = mongoose.model("Route", routeSchema);