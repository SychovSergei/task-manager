import express, { Express } from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "../routes";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
export default app;
