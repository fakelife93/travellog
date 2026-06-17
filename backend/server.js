const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const ticketRoutes = require("./src/routes/ticketRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use("/api/tickets", ticketRoutes);
app.get("/", (req, res) => {
  res.send("TravelLog Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});