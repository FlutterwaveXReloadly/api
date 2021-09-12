import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import db from "./config/db";

const app = express();
const port = env.PORT || 7000;

await db();

app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((res, req, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use((req, res) =>
  res.statusCode(404).json({ message: "Not found", status: 404 })
);

app.listen(port, () => console.log(`Server is running on port ${port}`));
