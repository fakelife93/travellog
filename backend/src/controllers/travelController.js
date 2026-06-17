const Travel = require("../models/Travel");

const getTravels = async (req, res) => {
  try {
    const travels = await Travel.find();

    res.status(200).json(travels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTravels,
};