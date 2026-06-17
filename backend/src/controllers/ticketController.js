const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: 1 });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createTicket,
  getTickets,
};
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createTicket,
  getTickets,
  deleteTicket,
  updateTicket,
};