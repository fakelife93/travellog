const express = require("express");
const router = express.Router();

const {
  createTicket,
  getTickets,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

router.post("/", createTicket);
router.get("/", getTickets);
router.delete("/:id", deleteTicket);
router.put("/:id", updateTicket);

module.exports = router;