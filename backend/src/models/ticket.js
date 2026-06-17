const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: Number,
      required: true,
    },

    travelsName: {
      type: String,
      required: true,
    },

    from: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    ticketNo: {
      type: String,
      required: true,
    },

    seatNo: {
      type: String,
      required: true,
    },

    fare: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);