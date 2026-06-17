const express = require("express");
const router = express.Router();

const {
  getRoutesByTravel,
} = require("../controllers/routeController");

router.get("/:travelsName", getRoutesByTravel);

module.exports = router;