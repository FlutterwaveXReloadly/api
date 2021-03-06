import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import multer from 'multer';

import { env } from "./config/env";
import db from "./config/db";
import routes from "./routes";

const app = express();
const port = env.PORT;
const upload = multer({ dest: '../uploads/' });

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

app.use('/v1', upload.single('img'), routes);
app.use((req, res) =>
  res
    .status(404)
    .json({
      message: "Not found!",
      status: 404,
      data: { url: req.originalUrl, method: req.method },
    })
);

app.listen(port, () => console.log(`Server is running on port ${port}`));
