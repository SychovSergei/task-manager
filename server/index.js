// const urlDB = 'mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true';
require('dotenv').config();
const express = require('express');

const { createServer } = require('http');
const cors = require("cors");
// const router = require("./routes/index");
// const errorHandler = require("./middleware/ErrorHandleMiddleware");

const PORT = process.env.PORT || 9200;

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/api", router);
app.get("/", (req, res, next) => {
  res.send('"Server SP works..."');
  next();
});

const start = () => {
  try {

    /** Create Server */
    const server = createServer(app);

    server.listen(PORT, () => console.log(`Server started on port`, PORT));

  } catch (e) {
    console.log('Start() ERROR', e);
  }
}

start();
