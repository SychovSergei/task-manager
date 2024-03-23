import express, { Express } from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "../routes";
import errorMiddleware from "../middleware/error-middleware";

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", router);
app.use(errorMiddleware);

export default app;
