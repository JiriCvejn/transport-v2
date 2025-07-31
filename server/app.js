const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import modelů (vytvoří tabulky při spuštění)
require("./models/User");
require("./models/Task");

// Import rout
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// Základní test endpoint
app.get("/api/ping", (_req, res) => {
  res.json({ ping: "pong" });
});

// Port z Renderu (nebo 3000 pro lokální test)
const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Databáze připravena");
    app.listen(PORT, () => {
      console.log(`Server běží na portu ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Chyba připojení k databázi:", err);
  });
