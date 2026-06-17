const express = require("express");
const router = express.Router();

const {
  getTravels,
} = require("../controllers/travelController");

router.get("/", getTravels);

module.exports = router;