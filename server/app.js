const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

require("./models/User");
require("./models/Task");

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

app.get("/api/ping", (_req, res) => {
  res.json({ ping: "pong" });
});

sequelize
  .sync()
  .then(() => {
    console.log("Databáze připravena");
    app.listen(process.env.PORT, () =>
      console.log("Server běží na portu", process.env.PORT)
    );
  })
  .catch((err) => {
    console.error("Chyba připojení k databázi:", err);
  });
