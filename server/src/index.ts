import config from "../config";

import mongoose from 'mongoose';

import app from "./bin/app";
import router from "./routes";

app.use("/api", router);

const dbConnect = async () => {
  try {
    const dbSource = config.mongoDbConfig.dbSource;

    /** Connect to MongoDB */
    await mongoose.connect(dbSource!
      // , { useUnifiedTopology: true, useNewUrlParser: true }
    );
    console.log("Connected to MongoDB success");

  } catch (e) {
    console.log("Error: connection to DB failed");
  }
}

const start = async () => {
  try {
    await dbConnect();

    const PORT = config.port;

    app.listen(PORT, () =>
      console.log(`[server]: Server is running at http://localhost:${PORT}`));
  } catch (e) {
    console.log("Start() ERROR", e);
  }
}

start().catch(err => console.log("err", err));
