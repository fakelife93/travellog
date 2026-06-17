const Route = require("../models/Route");

const getRoutesByTravel = async (req, res) => {
  try {
    const routes = await Route.find({
      travelsName: req.params.travelsName,
    });

    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRoutesByTravel,
};