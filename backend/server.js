const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const ticketRoutes = require("./src/routes/ticketRoutes");
const cors = require("cors");
const travelRoutes = require("./src/routes/travelRoutes");
const routeRoutes = require("./src/routes/routeRoutes");
const cityRoutes = require("./src/routes/cityRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tickets", ticketRoutes);
app.use("/api/travels", travelRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/cities", cityRoutes);
app.get("/", (req, res) => {
  res.send("TravelLog Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});