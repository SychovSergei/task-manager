require('dotenv').config();
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server SP works...");
});

const start = () => {
  try {

    /** Create Server */
    const server = createServer(app);

    server.listen(PORT, () => console.log("Server started on port", PORT));

  } catch (e) {
    console.log("Start() ERROR", e);
  }
}

start();
